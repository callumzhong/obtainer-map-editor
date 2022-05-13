function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,a=new Array(r);t<r;t++)a[t]=e[t];return a}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _iterableToArrayLimit(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var a,n,o=[],l=!0,u=!1;try{for(t=t.call(e);!(l=(a=t.next()).done)&&(o.push(a.value),!r||o.length!==r);l=!0);}catch(e){u=!0,n=e}finally{try{l||null==t.return||t.return()}finally{if(u)throw n}}return o}}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}var canvas=document.querySelector("canvas"),puzzleContainer=document.querySelector(".puzzle-container"),puzzleTarget=document.querySelector(".puzzle-target"),puzzleImage=document.querySelector(".puzzle-source"),puzzleTargetXY=[0,0],isMouseDown=!1,currentTarget=0,layers=[{},{},{}],exportImage=function(){var e=document.createElement("a");e.download="obtainer-map.png",e.href=canvas.toDataURL(),e.click()},clearCanvas=function(){layers=[{},{},{}],draw()},setLayer=function(e,r){r&&r.classList.remove("active"),currentTarget=+e.dataset.layer,e.classList.add("active")},getCoords=function(e){var r=e.target.getBoundingClientRect(),t=r.x,a=r.y,n=e.clientX-t,o=e.clientY-a;return[Math.floor(n/32),Math.floor(o/32)]},draw=function(){var e=canvas.getContext("2d");e.clearRect(0,0,canvas.width,canvas.height);layers.forEach((function(r){Object.keys(r).forEach((function(t){var a=Number(t.split("-")[0]),n=Number(t.split("-")[1]),o=_slicedToArray(r[t],2),l=o[0],u=o[1];e.drawImage(puzzleImage,32*l,32*u,32,32,32*a,32*n,32,32)}))}))},addTile=function(e){var r=getCoords(e),t=r[0]+"-"+r[1];e.shiftKey?delete layers[currentTarget][t]:layers[currentTarget][t]=[puzzleTargetXY[0],puzzleTargetXY[1]],draw()};canvas.addEventListener("mousedown",(function(){isMouseDown=!0})),canvas.addEventListener("mouseup",(function(){isMouseDown=!1})),canvas.addEventListener("mouseleave",(function(){isMouseDown=!1})),canvas.addEventListener("mousedown",addTile),canvas.addEventListener("mousemove",(function(e){isMouseDown&&addTile(e)})),puzzleContainer.addEventListener("mousedown",(function(e){puzzleTargetXY=getCoords(e),puzzleTarget.style.left=32*puzzleTargetXY[0]+"px",puzzleTarget.style.top=32*puzzleTargetXY[1]+"px"})),document.querySelectorAll(".controller__layer button").forEach((function(e,r,t){e.addEventListener("click",(function(e){var r=_toConsumableArray(t).find((function(e){return e.className.includes("active")}));setLayer(e.target,r)}))})),document.querySelector(".controller__buttons>button:nth-child(1)").addEventListener("click",clearCanvas),document.querySelector(".controller__buttons>button:nth-child(2)").addEventListener("click",exportImage),puzzleImage.onload=function(){draw()};var currentImage=localStorage.getItem("image")||"https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png";puzzleImage.src=currentImage;
//# sourceMappingURL=index.ad300069.js.map
