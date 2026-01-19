const form = document.getElementById('sealForm');
const textInput = document.getElementById('text');
const canvas = document.getElementById('sealCanvas');
const ctx = canvas.getContext('2d');
const previewSection = document.getElementById('previewSection');
const downloadBtn = document.getElementById('downloadBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const txt = textInput.value.trim();
  if (!/^.{2,4}$/.test(txt)) {
    alert('请输入2-4个汉字/字符');
    return;
  }
  drawSeal(txt);
  previewSection.classList.remove('hidden');
});

downloadBtn.addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'seal.png';
  a.click();
});

function drawSeal(text) {
  const size = canvas.width;
  ctx.clearRect(0,0,size,size);

  // Draw background rectangle & border
  ctx.fillStyle = '#d32f2f';
  ctx.fillRect(0,0,size,size);

  const border = size * 0.04;
  ctx.fillStyle = '#fff';
  ctx.fillRect(border,border,size-2*border,size-2*border);

  // Draw carved characters in red
  ctx.fillStyle = '#d32f2f';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = `${size/2}px STKaiti, KaiTi, serif`;

  if(text.length===2){
    ctx.fillText(text[0], size/2, size*0.35);
    ctx.fillText(text[1], size/2, size*0.68);
  }else if(text.length===3){
    ctx.font = `${size/2.5}px STKaiti, KaiTi, serif`;
    ctx.fillText(text[0], size/2, size*0.28);
    ctx.fillText(text[1], size/2, size*0.53);
    ctx.fillText(text[2], size/2, size*0.78);
  }else{
    ctx.font = `${size/3}px STKaiti, KaiTi, serif`;
    const positions=[0.28,0.53,0.78];
    ctx.fillText(text.slice(0,2), size/2, size*positions[0]);
    ctx.fillText(text.slice(2), size/2, size*positions[2]);
  }

  // Roughen edges: simple noise
  const imgData = ctx.getImageData(0,0,size,size);
  const data = imgData.data;
  for(let i=0;i<data.length;i+=4){
    // lighten randomly to create carved texture
    if(Math.random()<0.06){
      data[i] = data[i+1] = data[i+2] = 255; // make pixel white
    }
  }
  ctx.putImageData(imgData,0,0);
}