- ViewPager.java
    - populate():
    	- 1、onMeasure等时机调用
    	- 2、会继续测量：mCurItem-pageLimit ~ mCurItem+pageLimit中的项目(pageLimit默认1)
    	- 3、如果没有获取过，则加入mItems

    - 更新
        - 1、mAdapter.startUpdate(this);：当ViewPager将要改变的时候他会调用pageradapter的startUpdate函数
        - 2、接下来会调用一次或多次的instantiateItem或者destroyItem
        - 3、mAdapter.finishUpdate(this);：在ViewPager更新的后期调用pageradapter的finishUpdate函数
        - 4、当finishUpdate返回时 instantiateItem返回的对象应该添加到父ViewGroup; destroyItem返回的对象应该被ViewGroup删除。
        - viewpager不直接处理每一个视图而是将各个视图与一个键联系起来。
        - 这个键用来跟踪且唯一代表一个页面，不仅如此，该键还独立于这个页面所在adapter的位置。

- FragmentPagerAdapter.java:
    + instantiateItem()
	    - 1、mFragmentManager.beginTransaction() 取出一个事务，其实就是 BackStackRecord 对象
	    - 2、通过 mFragmentManager.findFragmentByTag() 获取缓存的Fragment对象
	    - 3、如果有缓存，则用缓存; 没有，则通过 getItem() 函数获取新的Fragment对象
	    - 4、将Fragment对象附带上opcode(BackStackRecord.OP_NULL...)交给事务

- BackStackRecord.java:
    + run():
        - calculateBackFragments(): 
		    * 1、根据OP_XX维护first-out-last-in的Fragment队列
		    * 2、OP_ADD::setLastIn():
			    - 如果fragment.mState < Fragment.CREATED && mManager.mCurState >= Fragment.CREATED，则通过makeActive将Fragment加入FragmentManagerImpl.mActive队列
			    - mManager.addFragment()：会调用makeActive，同时将Fragment加入FragmentManagerImpl.mAdded队列

- FragmentManager.java:
    + moveToState()
    + 从ArrayList<Fragment> mAdded中删除：
	    * detachFragment()
	    * removeFragment()
    + 从ArrayList<Fragment> mActive中删除：
	    * makeInactive()

### 总结
- ViewPager 和 FragmentManager 之间的交互通过事务进行
- FragmentPagerAdapter 的notifyDataSetChanged()
    + 默认情况下，只有当item个数发生变化时，才生效，并不会更新已有的视图。
    + 该函数将使用 getItemPosition() 的返回值来进行判断：
        * 如果为 POSITION_UNCHANGED，则什么都不做；
        * 如果为 POSITION_NONE，则调用 PagerAdapter.destroyItem() 来去掉该对象，并设置为需要刷新(needPopulate = true)以便触发PagerAdapter.instantiateItem()来生成新的对象。
    + 但是，因为 FragmentManager 中有mAdded、mActive缓存，所以instantiateItem中调用mFragmentManager.findFragmentByTag时会返回缓存的对象，所以不会触发视图重绘。

- FragmentPagerAdapter 与 FragmentStatePagerAdapter：
    + FragmentPagerAdapter：
        - 会将生成的 Fragment 保存在内存中，在需要时直接调用，而不要产生生成、销毁对象的额外的开销
    + FragmentStatePagerAdapter：
        - 只保留当前页面，当页面离开视线后，就会被消除，释放其资源；而在页面需要显示时，生成新的页面(就像 ListView 的实现一样)。这么实现的好处是当拥有大量页面时，不必在内存中占用大量的内存
    + 重载 getItemPosition() 函数，返回 POSITION_NONE 时:
        * FragmentStatePagerAdapter 会触发调用 destroyItem() 真正的释放资源，重建新的Fragment
        * FragmentPagerAdapter 仅仅会在 destroyItem() 中 detach 这个 Fragment，在 instantiateItem() 时会使用旧的 Fragment，并触发 attach，因此没有释放资源及重建的过程。

- 需要注意一个问题：
    + 在 Fragment 没有被添加到 FragmentManager 之前，我们可以通过 Fragment.setArguments() 来设置参数，并在 Fragment 中，使用 getArguments() 来取得参数。这是常用的参数传递方式。
    + 但是这种方式，在 Fragment 被添加到 FragmentManager 后，一旦再次调用 setArguments() 会导致 java.lang.IllegalStateException: Fragment already active 异常。

- Fragment中的变量：mBackStackNesting 标识，此Fragment能不能像调用栈那样回退回来。

> 代码：https://github.com/joyoushunter/Learn-xxx/tree/master/android/studio/testViewPager