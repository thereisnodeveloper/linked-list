console.log('Linked List package loaded - test!!!');
// eslint-disable-next-line no-unused-vars

// use Factory functions instead of clsasses

function linkedList() {
  console.log('linkedList() called...');
  // export default function linkedList() {
  let head;
  let tail;
  let size = 0;

  function checkIfSizeIs1(newNodeReference) {
    if (size === 0) {
      head = newNodeReference;
      tail = newNodeReference;
      return true;
    }
    return false;
  }
  /** @type {{evaluator: Function, callback: Function, currentNode: Symbol,
   * currentIndex: Number, resultString: String, caller: Function }} */
  function traverse(config) {
    let {
      evaluator,
      callback = null,
      currentNode = head,
      currentIndex = 0,
      resultString = '',
      caller = null,
    } = config;
    // console.log('config:', config);

    // TODO: calculate big O for time & space
    // MAYBE: use loop instead
    let stopConditionMet = false;
    const currentValue = currentNode.value;

    const methodSpecificConfigs = {
      [contains]: { targetProperty: currentValue, callbackOptions: {} },
      [find]: { targetProperty: currentValue, callbackOptions: {} },
      [at]: { targetProperty: currentIndex, callbackOptions: {} },
      [pop]: { targetProperty: currentIndex, callbackOptions: {} },
      [toString]: { targetProperty: currentIndex, callbackOptions: { resultString, currentNode } },
      [insertAt]: { targetProperty: currentIndex, callbackOptions: {} },
      [removeAt]: { targetProperty: currentIndex, callbackOptions: {} },
    };

    // console.log('caller:', caller)
    // console.log('methodSpecificComparisonValue[caller]:', methodSpecificComparisonValue[caller])

    // Defines the 'propertyValue' which is the threshold value for 'targetProperty'. The condition will be true when this value is reached or exceeded.
    // stopConditionMet = evaluateCondition(conditionObject, callback,
    // currentIndex, currentValue);
    stopConditionMet = evaluator(methodSpecificConfigs[caller].targetProperty);
    // BASE CASE
    if (stopConditionMet) {
      console.log(`stop condition ${stopConditionMet} met`);
      if (callback !== null) {
        return callback(methodSpecificConfigs[caller].callbackOptions);
      }
      return currentNode;
    }
    if (currentNode === tail) return currentNode;

    // RECURSIVE CASE

    resultString = resultString.concat(`( ${currentNode.value} )`, '->');
    currentNode = currentNode.next;

    return traverse({
      callback,
      evaluator,
      currentNode,
      currentIndex: currentIndex + 1,
      resultString,
      caller,
    });
  }

  function evaluateCondition(conditionObject, callback, currentIndex, currentValue) {
    // MAYBE: instead of using mode, assign "this" to static variable (which poiints to the caller function)
    let { condition1, condition2 } = conditionObject;
    let meetsCondition = false;

    switch (callback) {
      case 'at':
      case 'pop':
      case toStringCallback:
      case 'insertAt':
      case 'removeAt': {
        condition2 = currentIndex;
        break;
      }
      case 'contains':
      case findCallback: {
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
    // function atCallback() {}
    const result = traverse({evaluator: createEvaluator(targetIndex), caller : at});
    return result;
  }
  function pop() {
    if (size <= 0) throw new Error('Cannot pop, size is 0');
    function popCallback() {}
    const last = { ...tail };

    tail.value = null;
    const secondToLast = traverse({ condition1: size - 2 }, 'pop'); // find 2nd to the last element
    secondToLast.next = null;
    // set new tail value
    tail = secondToLast;
    size -= 1;

    return last;
  }
  function contains(targetValue) {
    function containsCallback() {}
    const currentNode = traverse({ condition1: targetValue }, 'contains');

    return currentNode.value === targetValue;
  }

  function find(targetValue) {
    function findCallback() {
      return currentIndex;
    }
    const index = traverse({ condition1: targetValue }, findCallback);
    return Number.isInteger(index) ? index : null; // traverse will return currentNode (tail) if nothing is found. If found, it will return an index,
  }

  function toString() {
    function toStringCallback(config) {
      const { resultString, currentNode } = config;
      console.log('starting toStringCallback');
      return `${resultString}( ${currentNode.value} ) -> ` + ' null';
    }

    return traverse({
      evaluator: createEvaluator(size - 1),
      callback: toStringCallback,
      currentNode: head,
      currentIndex: 0,
      resultString: '',
      caller: toString,
    });
  }
  function append(targetValue) {
    const newNodeReference = node(targetValue);

    checkIfSizeIs1(newNodeReference);

    tail.next = newNodeReference;

    tail = newNodeReference;
    size++;

    return newNodeReference;
  }

  function prepend(targetValue) {
    const newNodeReference = node(targetValue, head);

    checkIfSizeIs1(newNodeReference);

    head = newNodeReference;
    size++;
    return newNodeReference;
  }

  function insertAt(targetValue, targetIndex) {
    isIndexValid(targetIndex);
    function insertAtCallback() {}
    if (targetIndex === 0) {
      prepend(targetValue);
      return;
    }
    if (targetIndex === size - 1) {
      append(targetValue);
      return;
    }

    const insertionPoint = traverse({ condition1: targetIndex }, 'insertAt');
    const newNode = node(targetValue, insertionPoint.next);
    insertionPoint.next = newNode;
    size += 1;
    return newNode;
  }

  function removeAt(targetIndex) {
    isIndexValid(targetIndex);
    function removeAtCallback() {}
    if (targetIndex === 0) {
      aList.pop;
      return;
    }

    const nodeBeforeTarget = traverse({ condition1: targetIndex - 1 }, 'removeAt');
    const removalTarget = { ...nodeBeforeTarget.next };
    nodeBeforeTarget.next = nodeBeforeTarget.next.next;
    if (targetIndex === size - 1) {
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
    get tail() {
      return tail;
    },
    get head() {
      return head;
    },
    get size() {
      return size;
    },
    append,
    prepend,
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

function testLinkedList() {
  console.log('Starting LinkedList Tests');

  const list = linkedList();
  // Test append
  console.log('Testing append...');
  list.append(1);
  list.append(2);
  list.append(3);
  console.assert(list.size === 3, 'Size should be 3 after appending 3 elements');
  console.assert(list.head.value === 1, 'Head should be 1');
  console.assert(list.tail.value === 3, 'Tail should be 3');

  // Test prepend
  console.log('Testing prepend...');
  list.prepend(0);
  console.assert(list.size === 4, 'Size should be 4 after prepending');
  console.assert(list.head.value === 0, 'Head should be 0 after prepending');

  // Test at
  console.log('Testing at...');
  console.assert(list.at(0).value === 0, 'Element at index 0 should be 0');
  console.assert(list.at(2).value === 2, 'Element at index 2 should be 2');

  // Test pop
  // console.log('Testing pop...');
  // const popped = list.pop();
  // console.assert(popped.value === 3, 'Popped element should be 3');
  // console.assert(list.size === 3, 'Size should be 3 after popping');
  // console.assert(list.tail.value === 2, 'New tail should be 2');

  // Test contains and find (if implemented)
  // if (list.contains && list.find) {
  //   console.log('Testing contains and find...');
  //   console.assert(list.contains(1) === true, 'List should contain 1');
  //   console.assert(list.contains(5) === false, 'List should not contain 5');
  //   console.assert(list.find(0) === 0, 'Index of 0 should be 0');
  //   console.assert(list.find(2) === 2, 'Index of 2 should be 2');
  //   console.assert(list.find(5) === null, 'find(5) should return null');
  // } else {
  //   console.log('contains and find methods not implemented, skipping tests');
  // }

  // Test toString (if implemented)
  // console.log('List as string:', list.toString());

  // if (list.toString) {
  //   console.log('Testing toString...');
  //   console.log('List as string:', list.toString());
  //   console.assert(typeof list.toString() === 'string', 'toString should return a string');
  // } else {
  //   console.log('toString method not implemented, skipping test');
  // }

  console.log('LinkedList Tests Completed');
}

/**
 * Creates an evaluator function for comparing a target property with a given value.
 *
 * @param {Object} config - Configuration object for creating the evaluator.
 * @param {Symbol} config.targetProperty - The name of the property to evaluate.
 * @param {Symbol} config.propertyValue - The value to compare against the target property.
 * @returns {Function} A bound evaluator function that can be used for property comparison.
 *
 * @example
 * const config = { targetProperty: size -1};
 * const evaluator = createEvaluator(config);
 *
 * // Later usage (inside traverse() function):
 * evaluator.bind(null, {propertyValue: currentIndex})
 *
 * @note The returned evaluator function is partially bound with the targetProperty.
 * Additional arguments can be passed when calling the evaluator within traverse().
 */

function createEvaluator(targetProperty) {
  // const { targetProperty, propertyValue } = config;
  return function evaluator(propertyValue) {
    // console.log('targetProperty:', targetProperty);
    // console.log('propertyValue:', propertyValue);
    return targetProperty === propertyValue;
  };
  // ??? need to know if I can bind more arguments when I call it within traverse()
  // return evaluator.bind(null, { targetProperty });
}

// Run the tests
testLinkedList();

export { linkedList };
