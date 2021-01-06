```
//HeapOnly.cpp  
  #include   <iostream>  
  using   namespace   std;  
   
  class   HeapOnly  
  {  
  public:  
  HeapOnly()   {   cout   <<   "constructor."   <<   endl;   }  
  void   destroy   ()   const   {   delete   this;   }  
  private:  
  ~HeapOnly()   {}    
  };  
   
  int   main()  
  {  
    HeapOnly   *p   =   new   HeapOnly;  
    p->destroy();  
    // HeapOnly   h;  
    // h.Output();  
    
    return   0;  
  }  

//StackOnly.cpp  
//2005.07.18------2009.06.05  
  #include   <iostream>  
  using   namespace   std;  
   
  class   StackOnly  
  {  
    public:  
    StackOnly()   {   cout   <<   "constructor."   <<   endl;   }  
    ~StackOnly()   {   cout   <<   "destructor."   <<   endl;   }  
    private:  
    void*   operator   new   (size_t);  
  };  
   
  int   main()  
  {  
    StackOnly   s;                                                             //okay  
    StackOnly   *p   =   new   StackOnly;                           //wrong  
    
    return   0;  
  }
```