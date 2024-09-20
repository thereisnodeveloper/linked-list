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
    // TODO: calculate big O for time & space
    // MAYBE: use loop instead
    let stopConditionMet = false;
    stopCondition.operand2 = currentIndex;
    console.log('stopCondition.operand1:', stopCondition.operand1);
    console.log('stopCondition.operand2:', stopCondition.operand2);

    evalCondition({ stopCondition });

    if (stopCondition.operand1 === stopCondition.operand2) {
      stopConditionMet = true;
    }
    console.log(stopConditionMet);

    // BASE CASE
    if (stopConditionMet === true) return currentNode;
    if (currentNode === tail) return currentNode;

    // RECURSIVE CASE
    console.log('base condition NOT met, moving on');
    currentNode = currentNode.next;
    console.log('currentNode:', currentNode);
    return traverse(stopCondition, currentNode, currentIndex + 1);
  }

  function evalCondition(key, criterion, mode) {
    // const [key, criterion] = { condition };

    switch (mode) {
      case 'at': {
        console.log("targetIndex === currentindex")
        break;
      }
      case 'pop': {
        console.log("currentIndex === size -2")

        break;
      }
      case 'contains': {
        break;
      }
      default: {
        break;
      }
    }

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
    // TODO handle error if size === 0

    try {
      if (size <= 0) throw new Error('Cannot pop, size is 0');
      const last = tail;
      tail.value = null;
      const secondToLast = traverse({ operand1: size - 2 }); // find 2nd to the last element
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
    traverse({ operand1: value });
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
aList.pop();

const arrayAList = [8, 7, 2];

// const at = aList.at(3); // 7

const [head, tail, size] = [aList.getHead(), aList.getTail(), aList.getSize()];
console.log('head:', head);
console.log('tail:', tail);
console.log('size:', size);
// console.log('at:', at);
