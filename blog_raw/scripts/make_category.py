# coding=utf-8
import os
import yaml


def message(*args, **kwargs):
    print(' '.join(map(str, args)), **kwargs)  # noqa E999


class DictObject(dict):
    """ convert dict to object
    we can treat dict's keys as attributes
    """
    def __getattr__(self, key):
        return self.get(key)

    def __setattr__(self, key, value):
        self[key] = value


class CategoryItem(object):
    def __init__(self, unique_id=-1, name=None, path=""):
        """
        name: will be showed to users
        path: relative filepath
        permalink: specified url
        """
        self._id = unique_id
        self.name = name
        self.path = path
        self.metas = DictObject()
        self.metas.published = True

    def id(self):
        return self._id

    def set(self, title, desc, permalink=None, keywords=None, categories=None, published=True, tags=None, date=None):
        self.metas.title = title
        self.metas.description = desc if desc else ""
        self.metas.keywords = keywords if keywords else [""]
        self.metas.categories = categories if categories else [""]
        self.metas.permalink = permalink if permalink else ""
        self.metas.published = False if published is False else True
        self.metas.date = date
        self.metas.tags = tags if tags else [""]


class Categories(object):
    def __init__(self):
        self._nodes = []

    def root(self):
        if len(self._nodes) < 1:
            return None
        return self._nodes[0]

    def size(self):
        return len(self._nodes)

    def get(self, node_id):
        if node_id < 0 or node_id >= len(self._nodes):
            return None
        return self._nodes[node_id]

    def put(self, node):
        self._nodes.append(node)


class CategoryNode(object):
    def __init__(self, categories: Categories, parent_id=None, name=None, path=""):
        self._categories = categories
        self.data = CategoryItem(unique_id=self._categories.size(), name=name, path=path)
        self.parent_id = parent_id
        self.children_ids = set()

    def get_id(self):
        return self.data.id()

    def add_child(self, node):
        item_id = self._categories.size()
        self.children_ids.add(item_id)
        self._categories.put(node)

    def set_parent(self, item_id):
        parent = self._categories.get(item_id)
        if parent is not None:
            self.parent_id = item_id
        return parent

    def children(self):
        nodes = []
        for item_id in self.children_ids:
            item = self._categories.get(item_id)
            if item is None:
                continue
            nodes.append(item)
        return nodes


class BlogCategory(object):
    """ BlogCategory
    travel through the blogs and make categories using README.md.
    the blogs structure looks like this:
        first and second level are named by the directory name,  others file name's prefix
        eg. a/b/c_xxx.md have category a/b/c
    """
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.categories = Categories()

    def write(self):
        # first
        self._write_category(self.root_dir, self.categories.root())
        # second
        for index, sub_node in enumerate(self.categories.root().children()):
            self._write_category(self.root_dir, sub_node, root_depth=2, max_dive=9)
        return 0

    def _write_category(self, root_dir, cur_node: CategoryNode, root_depth=1, max_dive=1, filename="README.md"):
        message("===> write category ready: {}".format(cur_node.data.path))
        filepath = os.path.join(root_dir, cur_node.data.path, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            header = yaml.safe_dump(dict(cur_node.data.metas), allow_unicode=True, sort_keys=False)
            header = "---\n{}\n---\n".format(header.strip("\n"))
            title = "# {}\n".format(cur_node.data.metas.title.upper())
            category_items = [header, title]
            for index, sub_node in enumerate(cur_node.children()):
                category_item = BlogCategory._make_category_lines(sub_node, cur_id=index+1, cur_dive=0, max_dive=max_dive, root_depth=root_depth)
                category_items.append(category_item)
            f.write("\n".join(category_items))
        message("]]] write category end")
        return True

    @staticmethod
    def _make_category_lines(cur_node: CategoryNode, cur_id=1, cur_dive=0, max_dive=1, root_depth=1, prefix="#"):
        if cur_dive > max_dive or not cur_node.data.metas.published:
            return ""

        def get_index(cur_id=1, cur_dive=0, root_depth=1):
            num_xila = ["","I","II","III","IV","V","VI","VII","VIII","IX","X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"]
            num_ch = ["","一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六"]
            if cur_dive == 0:
                return num_xila[cur_id] + " - " if root_depth < 2 else num_ch[cur_id] + "、"
            return ""

        if cur_node.data.name is None:
            label = "*"
            title = cur_node.data.metas.title
            path = cur_node.data.path
        else:
            label = "{} {}".format(prefix*(cur_dive+2), get_index(cur_id, cur_dive, root_depth))
            title = cur_node.data.name
            path = "{}/{}".format(cur_node.data.path, "README.md")

        if root_depth == 1:
            if cur_node.data.name is None:
                line = None
            elif cur_dive == 0:
                label = "{} Part {}".format(prefix * (cur_dive + 2), get_index(cur_id, cur_dive, root_depth))
                line = "{} {}\n* [目录]({})".format(label, title.title(), path.replace('\\', '/'))
            else:
                line = "{} [{} - {}]({})".format("*", "Chapter", title.title(), path.replace('\\', '/'))
        else:
            path = os.path.join("../" * (root_depth - 1), path)
            if cur_node.data.name is None:
                line = "{} [{}]({})".format(label, title.title(), path.replace('\\', '/'))
            elif cur_dive == 0:
                line = "{} {}".format(label, title.title())
            else:
                line = "{} [{}]({})".format(label, title.title(), path.replace('\\', '/'))
        lines = [line] if line else []
        for index, child in enumerate(cur_node.children()):
            cur_line = BlogCategory._make_category_lines(child, index+1, cur_dive+1, max_dive, root_depth, prefix)
            if cur_line:
                lines.append(cur_line)
        if cur_dive == 0 and cur_node.data.name is not None:
            lines.append("")
        return "\n".join(lines)

    def generate(self):
        def fn_filter(filepath, ignores=[".blog_category", "readme.md", "sample", "rsc", "resource", "images"]):
            _, filename = os.path.split(filepath)
            name, suffix = os.path.splitext(filename)
            if filename.lower() in ignores:
                return False
            if os.path.isfile(filepath) and suffix.lower() != ".md":
                return False
            return True
        return self._make_category(self.root_dir, None, fn_filter=fn_filter)

    def _make_category(self, root_dir, cur_node, fn_filter=None):
        message("ready to make category: {}".format(cur_node.data.path if cur_node else ""))
        metapath_getter = lambda x: x if os.path.isfile(x) else os.path.join(x, ".blog_category")
        cur_path = os.path.join(root_dir, cur_node.data.path if cur_node else "")
        metas = BlogCategory.extract_md_metas(metapath_getter(cur_path))
        if cur_node is None:
            cur_node = CategoryNode(self.categories, name="root")
            self.categories.put(cur_node)
        if metas:
            cur_node.data.set(metas.title, metas.description, metas.permalink, metas.keywords
                              , metas.categories, metas.published, metas.tags, metas.date)
        filenames = os.listdir(cur_path) if os.path.isdir(cur_path) else []
        filenames = filter(lambda x: fn_filter(os.path.join(cur_path, x)) if fn_filter else True, filenames)
        for filename in filenames:
            category_name = filename if os.path.isdir(os.path.join(cur_path, filename)) else None
            child = CategoryNode(self.categories, cur_node.get_id(), category_name, os.path.join(cur_node.data.path, filename))
            cur_node.add_child(child)
        if cur_node.children():
            for sub_node in cur_node.children():
                self._make_category(root_dir, sub_node, fn_filter)
        return self.categories.size()

    @staticmethod
    def extract_md_metas(filepath, delimiter="---"):
        if not os.path.isfile(filepath):
            return DictObject({})
        message("---> ready to extract_md_metas {}".format(filepath))
        lines = []
        with open(filepath, "r", encoding="utf-8") as f:
            start = False
            for line in f.readlines():
                if line.startswith(delimiter):
                    start = not start
                    if not start and len(lines) > 0:
                        break
                    continue
                if start:
                    lines.append(line)
        yaml_obj = yaml.safe_load("".join(lines))
        return DictObject(yaml_obj) if yaml_obj else DictObject({})


if __name__ == "__main__":
    blogCategory = BlogCategory("..\\blog")
    result = blogCategory.generate()
    result = blogCategory.write()
    message("node count: {}".format(result))