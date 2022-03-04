const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowColor = "rgb(0,0,0,0.2)";
ctx.shadowBlur = 5;

const density =
	"@QB#NgWM8RDHdOKq9$6khEPXwmeZaoS2yjufF]}{tx1zv7lciL/\\|?*>r^;:_\"~,'.-` ";

function getChar(brightness) {
	return density[
		density.length - 1 - Math.floor((density.length * brightness) / 255)
	];
}

const img = new Image();
img.src = "Mask.jpg";
img.addEventListener("load", () => {
	let final = "";
	let width = img.width;
	let height = img.height;
	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(img, 0, 0, width, height);
	const scannedImage = ctx.getImageData(0, 0, width, height);
	let imgArray = scannedImage.data;
	ctx.clearRect(0, 0, width, height);
	for (let y = 0; y < height; y += 12) {
		for (let x = 0; x <= width; x += 12) {
			let i = y * width * 4 + x * 4;
			let total = imgArray[i] + imgArray[i + 1] + imgArray[i + 2];

			ctx.fillStyle = `rgb(${imgArray[i]},${imgArray[i + 1]},${
				imgArray[i + 2]
			})`;
			ctx.font = "14px monospace";
			ctx.fillText(getChar(total / 3), x, y);
			final += getChar(total / 3);
			final += " ";
		}
		final += "\n";
	}
	// console.log(final);
});
