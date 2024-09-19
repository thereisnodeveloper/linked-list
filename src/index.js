// #region required-template
import './reset.css';
import './style.css';

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion

// use Factory functions instead of clsasses

function linkedList() {
  let head;
  let tail;
  let size = 0;

  function getTail() {
    // MAYBE: I could traverse instead of storing tail in memory
    return tail;
  }

  function getSize() {
    return size;
  }

  function getHead() {
    return head;
  }

  function checkIfSizeIs1(newNodeReference) {
    if (getSize() === 0) {
      head = newNodeReference;
      tail = newNodeReference;
      return true;
    }
    return false;
  }

  function append(value) {
    const newNodeReference = node(value);

    // check if this is the 1st node
    checkIfSizeIs1(newNodeReference);
    // change current tail node's next
    getTail().next = newNodeReference;

    // set new tail property
    tail = newNodeReference;
    size++;

    return newNodeReference;
  }

  function prepend(value) {
    // TODO: implement
  }

  return {
    append,
    prepend,
    getHead,
    getSize,
    getTail,
  };
}

// MAYBE: use undefined instead of null
function node(value = null, next = null) {
  return { value, next };
}

const aList = linkedList();
aList.append(2);
aList.append(5);

const [head, tail, size] = [aList.getHead(), aList.getTail(),aList.getSize(), ];
console.log('head:', head)
console.log('tail:', tail)
console.log('size:', size)