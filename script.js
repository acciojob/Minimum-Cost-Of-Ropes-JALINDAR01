function calculateMinCost() {
  const input = document.getElementById("input").value;
   const arr=input.split(",");

	const heap = new array();
	for (let i = 0; i < arr.length; i++) {
		heap.push(Number(arr[i]));
	}
  let cost = 0;
	while (heap.length>1) {
		const first=heap.pop();
		const second=heap.pop();

		cost+=first+second;

		heap.push(first+second);
	}
  
  return cost;
}  
