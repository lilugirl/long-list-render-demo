// 请求函数
const getList = ()=>{
  return new Promise((resolve,reject)=>{
      const Ajax=new XMLHttpRequest();
      Ajax.open('get','http://localhost:8000/');
      Ajax.send();
      Ajax.onreadystatechange=function(){
          if(Ajax.readyState===4 && Ajax.status===200){
              resolve(JSON.parse(Ajax.responseText))
          }
      }

  })
}


const container = document.getElementById('container');

const renderList = async ()=>{
   console.time('列表时间')
   const list =await getList();
   let page=0;
   const limit=200;
   const total=list.length;
   const totalPage=Math.ceil(total/limit);

   const render=(page)=>{
       if(page>totalPage){
          console.timeEnd('列表时间')
           return;
       }

       requestAnimationFrame(()=>{
           // 创建一个文档碎片
          const fragment = document.createDocumentFragment();
          for(let i=page*limit;i<page*limit+limit;i++){
              const item=list[i];
              const div=document.createElement('div');
              div.className='sunshine';
              div.innerHTML=`<img src=${item.src} /><span>${item.text}</span>`;
              // 先塞进文档碎片
              fragment.appendChild(div)
          }
        // 一次性appendChild
        container.appendChild(fragment)
        render(page+1);

       })
   }

   render(0)
  

}

renderList();