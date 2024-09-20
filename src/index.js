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
  // ??? tradeoff between saving "tail" as a value vs. traversing every time:
  // no need to traverse to find tail.
  // ??? OPERATIONS affected: POP (you have to know where tail is ).

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

  function traverse(
    conditionObject,
    mode = null,
    currentNode = head,
    currentIndex = 0,
    resultString = ''
  ) {
    // TODO: calculate big O for time & space
    // MAYBE: use loop instead

    let stopConditionMet = false;
    const currentValue = currentNode.value;

    stopConditionMet = evaluateCondition(conditionObject, mode, currentIndex, currentValue);

    // BASE CASE
    if (stopConditionMet === true) {
      if (mode === 'find') {
        return currentIndex;
      }
      if (mode === 'toString') {
        return resultString + ' null';
      }
      return currentNode;
    }
    if (currentNode === tail) return currentNode;

    // RECURSIVE CASE
    // console.log('base condition NOT met, moving on');
    resultString = resultString.concat(`( ${currentNode.value} )`, '->');
    currentNode = currentNode.next;
    // console.log('currentNode:', currentNode);

    return traverse(conditionObject, mode, currentNode, currentIndex + 1, resultString);
  }

  function evaluateCondition(conditionObject, mode, currentIndex, currentValue) {
    //MAYBE: instead of using mode, assign "this" to static variable (which poiints to the caller function)
    let { condition1, condition2 } = conditionObject;
    let meetsCondition = false;
    switch (mode) {
      case 'at':
      case 'pop':
      case 'toString':
      case 'insertAt': {
        condition2 = currentIndex;
        break;
      }
      case 'contains':
      case 'find': {
        condition2 = currentValue;
        break;
      }

      default:
    }
    meetsCondition = condition1 === condition2;
    console.log('meetsCondition:', meetsCondition);

    return meetsCondition;
    // TODO: generalize condition evaluation
  }

  function at(targetIndex) {
    try {
      // if (targetIndex + 1 > size) {
      //   throw new Error('Invalid Index');
      // }
      isIndexValid(targetIndex);
      const result = traverse({ condition1: targetIndex }, 'at');
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  function pop() {
    // TODO handle error if size === 0

    try {
      if (size <= 0) throw new Error('Cannot pop, size is 0');
      const last = { ...tail };

      tail.value = null;
      const secondToLast = traverse({ condition1: size - 2 }, 'pop'); // find 2nd to the last element
      secondToLast.next = null;
      // set new tail value
      tail = secondToLast;
      size -= 1;

      return last;
    } catch (error) {
      console.error(error);
    }
  }
  function contains(value) {
    const currentNode = traverse({ condition1: value }, 'contains');
    // console.log('currentNode:', currentNode)
    return currentNode.value === value;
  }

  function find(value) {
    const index = traverse({ condition1: value }, 'find');
    return Number.isInteger(index) ? index : undefined; // traverse will return currentNode (tail) if nothing is found. If found, it will return an index,
  }

  function toString() {
    return traverse({ condition1: size - 1 }, 'toString');
    // TODO represents your LinkedList objects as strings, so you can print them
    // and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
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
    const newNodeReference = node(value, head); // check if just 'head' will work

    // check if this is the 1st node
    checkIfSizeIs1(newNodeReference);

    // set new tail property
    head = newNodeReference;
    size++;
    return newNodeReference;
  }

  function insertAt(value, index) {
    try {
      isIndexValid(index);

      if (index === 0) {
        prepend(value);
        return;
      }
      if (index === size - 1) {
        append(value);
        return;
      }

      const insertionPoint = traverse({ condition1: index }, 'insertAt');
      const newNode = node(value, insertionPoint.next);
      insertionPoint.next = newNode;
      size += 1;
      return newNode;
    } catch (error) {
      console.error(error)
    }
  }

  function removeAt(index) {
    //TODO: that removes the node at the given index.
  }

  function isIndexValid(targetIndex) {
    if (targetIndex + 1 > size) {
      throw new Error('Invalid Index');
    }
    //MAYBE:generalized error handling
  }
  return {
    append,
    prepend,
    getHead,
    getSize,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
  };
}

// MAYBE: use undefined instead of null
function node(value = null, next = null) {
  return { value, next };
}

const aList = linkedList();
aList.append(2);
aList.append(5);
aList.append(4);
aList.prepend(10);
aList.prepend(7);
aList.prepend(8);
const arrayAList = [8, 7, 10, 2, 5, 4];

const at = aList.at(4); // 7
const popped = aList.pop();
const contains = aList.contains(8);
const find = aList.find(1000);
const insertAt = aList.insertAt(50, 2);

const toString = aList.toString();
console.log('toString:', toString);

const [head, tail, size] = [aList.getHead(), aList.getTail(), aList.getSize()];
console.log('head:', head);
console.log('tail:', tail);
console.log('size:', size);
// console.log('at:', at);
