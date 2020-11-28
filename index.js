// 获取选中图片input
var fileInput = document.querySelector("#chooseImg");
// 
let backImg = document.querySelector("#backImg")
// 裁剪框
let cutBorder = document.querySelector("#chooseBorder")
cutBorder.style.display="none"
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// 边框四个角的坐标
let leftTop
let rightTop
let leftBottom
let rightBottom

// 触摸的坐标
let touchPoint

// 边框宽度
let cutBorderWidth
let cutBorderHeight
let imgMation

// 裁剪按钮
let cutBtn = document.getElementById("cutBtn");
// 选择图片,图片选择input
fileInput.onchange = function () {
  console.log(fileInput.files);
  //文件转可读取格式
  let fr = new FileReader();
  // file转为src
  console.log(window.URL.createObjectURL(fileInput.files[0]));

  fr.readAsDataURL(fileInput.files[0]);
  fr.onloadend = function (e) {
    backImg.src = e.target.result;

    // img.src = e.target.result;
    // 图片完成后渲染canvas
    backImg.onload = function () {
      cutBorder.style.display=""
      // 选中图片后,添加选择框样式
      imgMation = backImg.getBoundingClientRect()
      console.log(backImg.offsetLeft,"z")
      cutBorder.style.width = Math.round(imgMation.width) + "px"
      cutBorder.style.height = Math.round(imgMation.height) + "px"
      cutBorder.style.top = backImg.offsetTop+"px"
      cutBorder.style.left = backImg.offsetLeft+"px"
      cutBorderWidth = parseInt(cutBorder.style.width)
      cutBorderHeight = parseInt(cutBorder.style.height)

      // 四个角的位置坐标
      leftTop = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top)]
      rightTop = [parseInt(cutBorder.style.left) + cutBorderWidth, parseInt(cutBorder.style.top)]
      leftBottom = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top) + cutBorderHeight]
      rightBottom = [parseInt(cutBorder.style.left) + cutBorderWidth, parseInt(cutBorder.style.top), parseInt(cutBorder.style.top) + cutBorderHeight]
      console.log(leftTop)
      console.log(rightTop)
      console.log(leftBottom)
      console.log(rightBottom)
      // ctx.drawImage(img, 0, 0);

    };
  };
};


cutBorder.ontouchstart = function (e) {
  // 触摸的坐标
  touchPoint = [Math.round(e.targetTouches[0].pageX), Math.round(e.targetTouches[0].pageY)]
  cutBorderWidth = parseInt(cutBorder.style.width)
  cutBorderHeight = parseInt(cutBorder.style.height)
  leftTop = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top)]
  rightTop = [cutBorderWidth + parseInt(cutBorder.style.left), parseInt(cutBorder.style.top)]
  leftBottom = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top) + cutBorderHeight]
  rightBottom = [parseInt(cutBorder.style.left) + cutBorderWidth, parseInt(cutBorder.style.top) + cutBorderHeight]
  console.log(leftTop)
  console.log(rightTop)
  console.log(leftBottom)
  console.log(rightBottom)
}
cutBorder.ontouchend = function (e) {
  // 触摸的坐标
  cutBorderWidth = parseInt(cutBorder.style.width)
  cutBorderHeight = parseInt(cutBorder.style.height)
  leftTop = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top)]
  rightTop = [cutBorderWidth + parseInt(cutBorder.style.left), parseInt(cutBorder.style.top)]
  leftBottom = [parseInt(cutBorder.style.left), parseInt(cutBorder.style.top) + cutBorderHeight]
  rightBottom = [parseInt(cutBorder.style.left) + cutBorderWidth, parseInt(cutBorder.style.top) + cutBorderHeight]

}
cutBorder.ontouchmove = function (e) {
  switch (true) {
    case (Math.abs(touchPoint[0] - leftTop[0]) < 20) && (Math.abs(touchPoint[1] - leftTop[1]) < 20):
      console.log("左上")
      cutBorder.style.left = Math.round(e.targetTouches[0].pageX) + "px"
      cutBorder.style.top = Math.round(e.targetTouches[0].pageY) + "px"
      cutBorder.style.width = cutBorderWidth - (parseInt(e.targetTouches[0].pageX) - leftTop[0]) + "px"
      cutBorder.style.height = cutBorderHeight - (parseInt(e.targetTouches[0].pageY) - leftTop[1]) + "px"
      break;
    case ((Math.abs(touchPoint[0] - rightTop[0]) < 20) && (Math.abs(touchPoint[1] - rightTop[1]) < 20)):
      console.log("右上")
      cutBorder.style.top = Math.round(e.targetTouches[0].pageY) + "px"
      cutBorder.style.width = cutBorderWidth - (rightTop[0] - parseInt(e.targetTouches[0].pageX)) + "px"
      cutBorder.style.height = cutBorderHeight - (parseInt(e.targetTouches[0].pageY) - rightTop[1]) + "px"
      break;
    case Math.abs(touchPoint[0] - leftBottom[0]) < 10 && Math.abs(touchPoint[1] - leftBottom[1]) < 10:
      console.log("左下")
      cutBorder.style.left = Math.round(e.targetTouches[0].pageX) + "px"
      cutBorder.style.width = cutBorderWidth - (parseInt(e.targetTouches[0].pageX) - leftTop[0]) - 1 + "px"
      cutBorder.style.height = cutBorderHeight - (leftBottom[1] - parseInt(e.targetTouches[0].pageY)) + "px"
      break
    case Math.abs(touchPoint[0] - rightBottom[0]) < 10 && Math.abs(touchPoint[1] - rightBottom[1]) < 10:
      console.log("右下")
      cutBorder.style.width = cutBorderWidth - (rightTop[0] - parseInt(e.targetTouches[0].pageX)) - 1 + "px"
      cutBorder.style.height = cutBorderHeight - (rightBottom[1] - parseInt(e.targetTouches[0].pageY)) + "px"
      break
  }
}

cutBtn.onclick = function () {
  cutMethod()
}
// 裁剪图片
function cutMethod() {
  ctx.clearRect(0, 0, 250, 300);
  console.log(leftTop[0], leftTop[1],cutBorderWidth, cutBorderHeight, 0, 0)
  console.log(backImg.naturalWidth,backImg.naturalHeight)
  console.log(backImg.width,backImg.height)
  console.log(backImg.naturalWidth/backImg.width)
  //图片比例
  let constNum=backImg.naturalWidth/backImg.width
  let constNumH=backImg.naturalHeight/backImg.height
  c.width=cutBorderWidth*constNum
  c.height=cutBorderHeight*constNum
  ctx.drawImage(backImg, (leftTop[0]-backImg.offsetLeft)*constNum, (leftTop[1]-backImg.offsetTop)*constNumH,cutBorderWidth*constNum,cutBorderHeight*constNumH,0,0,cutBorderWidth*constNum,cutBorderHeight*constNumH);
  backImg.src=c.toDataURL()
  console.log(c.toDataURL())
}

// 保存
let save = document.querySelector("#save");
save.onclick = function (e) {
  var dataURL = c.toDataURL();
  console.log(dataURL);
  let a = document.createElement("a"); // 生成一个a元素
  let event = new MouseEvent("click"); // 创建一个单击事件
  a.download = "photo"; // 设置图片名称
  a.href = dataURL; // 将生成的URL设置为a.href属性
  a.dispatchEvent(event); // 触发a的单击事件
};