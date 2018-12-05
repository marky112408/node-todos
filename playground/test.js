function palindrome(txt){
	var txt_arr = txt.split("");
	var pal = "";
	for(var x = txt_arr.length - 1; x >= 0; x--){
		pal += txt_arr[x];
	}

	if(pal == txt){
		// console.log("TRUE");
		// console.log(pal+"--"+txt);
		console.log(true);
	}else{
		// console.log("FALSE");
		// console.log(pal+"--"+txt);
		console.log(false);
	}
}

function fuck(num){
	// console.log(2);
	for(var x = num; x <= num*10; x++){
		if(x % 2 === 0){
			console.log("Even");
			console.log(x);
		}
		// }else{
		// 	console.log("Odd");
		// 	console.log(x);
		// }
	}
}
// palindrome("AaqqHA");
fuck(1);