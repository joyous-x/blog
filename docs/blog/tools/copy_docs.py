# coding=utf8

import sys
import os
import re
import shutil
import logging

logging.basicConfig(
    level=logging.DEBUG, 
    format="%(asctime)s - %(filename)s[L%(lineno)d] - %(levelname)s - %(message)s",
    stream=sys.stdout
)

class DocsCopier(object):
    def __init__(self, rootDir=None):
        self.rootDir = rootDir

    def walkDir(self, pathDir=None, fnFilter=None):
        targetDir = pathDir if pathDir else self.rootDir
        result = []
        listFs = os.walk(targetDir, followlinks=False)
        for pathCur, listDirs, listFiles in listFs:  
            for name in listFiles:
                filePath = os.path.join(pathCur, name)
                if fnFilter and fnFilter(filePath):
                    result.append((pathCur, name))
        return result

    def filter(filePath, suffix=".md", tag="publish: true"):
        if suffix != os.path.splitext(filePath)[-1]:
            return False
        try:
            pattern = re.compile("-{3,}.*%s.*-{3,}" % tag, re.M|re.I|re.S)
            with open(filePath, mode="r") as f:
                if pattern.match(f.read()):
                    logging.debug("DocsCopier.filter find: %s" % (filePath))
                    return True
        except Exception as e:
            logging.error("DocsCopier.filter path=%s exception:%s" % (filePath, str(e)))
        return False

    def copy(self, files, targetDir):
        try:
            for p,n in files:
                shutil.copy(os.path.join(p,n), os.path.join(targetDir, n))
                logging.debug("DocsCopier.copy success src=%s dst=%s" % (os.path.join(p,n), os.path.join(targetDir, n)))
        except Exception as e:
            logging.error("DocsCopier.copy targetDir=%s exception:%s" % (targetDir, str(e)))

curDir = os.path.abspath(os.path.dirname(__file__))
srcDir = os.path.abspath(os.path.join(curDir, "../../Pluto"))
dstDir = os.path.abspath(os.path.join(curDir, "../src/content/post"))
copier = DocsCopier(srcDir)
files = copier.walkDir(fnFilter=DocsCopier.filter)
copier.copy(files, dstDir)