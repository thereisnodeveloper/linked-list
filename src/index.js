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
      return {
        at,
        pop,
        contains,
        find,
        toString,
      };

      return true;
    }
    return false;
  }

  function traverse(stopCondition = {}, currentNode = head, currentIndex = 0) {
    let stopConditionMet = false;
    stopCondition.operand2 = currentIndex;
    console.log('stopCondition.operand1:', stopCondition.operand1);
    console.log('stopCondition.operand2:', stopCondition.operand2);

    if (stopCondition.operand1 === stopCondition.operand2) {
      stopConditionMet = true;
    }
    console.log(stopConditionMet);

    // BASE CASE
    if (stopConditionMet === true) return currentNode;
    if (currentNode === tail) return currentNode; // ??? not sure if this comparison will work

    // RECURSIVE CASE
    console.log('base condition NOT met, moving on');
    currentNode = currentNode.next;
    console.log('currentNode:', currentNode);
    return traverse(stopCondition, currentNode, currentIndex + 1);
  }

  function evalCondition(condition) {
    return condition;
    // TODO: generalize condition evaluation
  }

  function at(targetIndex) {
    try {
      if (targetIndex + 1 > size) {
        throw new Error('Invalid Index');
      }
      const result = traverse({ operand1: targetIndex });
      return result;
    } catch (error) {
      console.error(error);
    }

  }
  function pop() {
    // TODO removes the last element from the list
  }
  function contains(value) {
    // TODO returns true if the passed in value is in the list and otherwise returns false.
  }

  function find(value) {
    // TODO returns the index of the node containing value, or null if not found.
  }

  function toString() {
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
  };
}

// MAYBE: use undefined instead of null
function node(value = null, next = null) {
  return { value, next };
}

const aList = linkedList();
aList.append(2);
aList.append(5);
aList.prepend(7);
aList.prepend(8);

const arrayAList = [8, 7, 2, 5];

const at = aList.at(3); // 7

const [head, tail, size] = [aList.getHead(), aList.getTail(), aList.getSize()];
console.log('head:', head);
console.log('tail:', tail);
console.log('size:', size);
console.log('at:', at);
