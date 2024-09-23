


console.log('Linked List package loaded - test!!!');
// eslint-disable-next-line no-unused-vars

// use Factory functions instead of clsasses
function testFunction() {
  console.log('this is just a test function......');
}

function linkedList() {
  console.log('linkedList() called...');
  // export default function linkedList() {
  let head;
  let tail;
  let size = 0;


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
    resultString = '',
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
        return `${resultString}( ${currentNode.value} ) -> ` + ' null';
        // return resultString  + ' null';
      }
      return currentNode;
    }
    if (currentNode === tail) return currentNode;

    // RECURSIVE CASE

    resultString = resultString.concat(`( ${currentNode.value} )`, '->');
    currentNode = currentNode.next;

    return traverse(conditionObject, mode, currentNode, currentIndex + 1, resultString);
  }

  function evaluateCondition(conditionObject, mode, currentIndex, currentValue) {
    // MAYBE: instead of using mode, assign "this" to static variable (which poiints to the caller function)
    let { condition1, condition2 } = conditionObject;
    let meetsCondition = false;
    switch (mode) {
      case 'at':
      case 'pop':
      case 'toString':
      case 'insertAt':
      case 'removeAt': {
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

    return meetsCondition;
  }

  function at(targetIndex) {
    isIndexValid(targetIndex);
    const result = traverse({ condition1: targetIndex }, 'at');
    return result;
  }
  function pop() {
    if (size <= 0) throw new Error('Cannot pop, size is 0');
    const last = { ...tail };

    tail.value = null;
    const secondToLast = traverse({ condition1: size - 2 }, 'pop'); // find 2nd to the last element
    secondToLast.next = null;
    // set new tail value
    tail = secondToLast;
    size -= 1;

    return last;
  }
  function contains(value) {
    const currentNode = traverse({ condition1: value }, 'contains');

    return currentNode.value === value;
  }

  function find(value) {
    const index = traverse({ condition1: value }, 'find');
    return Number.isInteger(index) ? index : undefined; // traverse will return currentNode (tail) if nothing is found. If found, it will return an index,
  }

  function toString() {
    return traverse({ condition1: size - 1 }, 'toString');
  }
  function append(value) {
    const newNodeReference = node(value);

    checkIfSizeIs1(newNodeReference);

    getTail().next = newNodeReference;

    tail = newNodeReference;
    size++;

    return newNodeReference;
  }

  function prepend(value) {
    const newNodeReference = node(value, head);

    checkIfSizeIs1(newNodeReference);

    head = newNodeReference;
    size++;
    return newNodeReference;
  }

  function insertAt(value, index) {
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
  }

  function removeAt(index) {
    isIndexValid(index);
    if (index === 0) {
      aList.pop;
      return;
    }

    const nodeBeforeTarget = traverse({ condition1: index - 1 }, 'removeAt');
    const removalTarget = { ...nodeBeforeTarget.next };
    nodeBeforeTarget.next = nodeBeforeTarget.next.next;
    if (index === size - 1) {
      tail = nodeBeforeTarget;
      console.log('NEW tail:', tail);
    }
    size -= 1;
    return removalTarget;
  }

  function isIndexValid(targetIndex) {
    if (targetIndex + 1 > size) {
      throw new Error('Invalid Index');
    }
  }

  // MAYBE: use undefined instead of null
  function node(value = null, next = null) {
    return { value, next };
  }

  return {
    get tail(){return tail},
    get head(){return head},
    get size(){return size},
    append,
    prepend,
    // getHead,
    // getSize,
    // getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    node,
  };
}






















export { testFunction as testFunc, linkedList };
