function calculateMinCost() {
  const inputElement = document.getElementById("input");
  const resultElement = document.getElementById("result");

  // Parse the input string to get an array of rope lengths
  const inputStr = inputElement.value;
  const ropeLengths = inputStr.split(",").map(Number);

  // Create a min heap to store the rope lengths
  const minHeap = new MinHeap();

  // Add all rope lengths to the min heap
  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  // Merge ropes until there is only one rope left in the min heap
  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();
    const combinedLength = firstRope + secondRope;
    totalCost += combinedLength;
    minHeap.insert(combinedLength);
  }

  // Set the result in the resultElement
  resultElement.textContent = totalCost.toString();
}

// MinHeap class for maintaining the minimum element efficiently
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallest]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallest]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.sinkDown(smallest);
    }
  }
}
