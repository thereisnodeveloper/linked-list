---
created: 2024-09-23T10:21:03 (UTC -04:00)
tags: []
source: https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814
author: bdng

  5133 bronze badges
---

# beginner - Basic Linked List Implementation in JavaScript - Code Review Stack Exchange

> ## Excerpt
>
> Here's an eyeball review I'll expand on later with a rewrite suggestion if I have time.
> Never swallow errors or log inside of methods that perform logic. Throw errors to the client of your code and...

---

# [Basic Linked List Implementation in JavaScript](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript)

[Ask Question](https://codereview.stackexchange.com/questions/ask)

Asked 2 days ago

Modified [today](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814?lastactivity '2024-09-23 14:06:26Z')

Viewed 80 times

5

[](https://codereview.stackexchange.com/posts/293786/timeline)

#### Clarification of Intent

- Recursion here is used on purpose for practice - note that iteration is preferred in this case (I'll be more clear about where my intentions are!)
- Factory function was also used in place of `class` for practice
- The project is educational, for the purposes of learning the ins and outs of Linked Lists

This is most likely used in my next project HashMap (as a part of The Odin Project [https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#growth-of-a-hash-table](https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#growth-of-a-hash-table) ) , and I wanted to ensure that the code is good.

Here are some of my concerns which I'd love to get some feedback on:

1.  I implemented a generalized traverse() function and made each operation call it with a "mode" parameter. I'm not sure about this implementation.
2.  I struggled to implement a generalized evaluateCondition function. Part of the evaluateCondition parameter is set indirectly by using "mode" + switch statements (condition2). The other part would be set by passing a conditionObject right when any linkedList operation calls traverse(). The challenge was that condition2 needed to be either value/index, which would change only within traverse(). I am not sure if my solution was okay. Concerned about passing too many parameters into traverse() as it is recursive.
3.  is it good practice to track \[head,tail,size\] as variables inside my module? I'd decided the tradeoff is worth it, since the alternative would be to re-calculate all 3 using traverse() every time I need any one of these values.
4.  I had some concerns about the space complexity. Articles such as this one [https://www.geeksforgeeks.org/time-and-space-complexity-of-linked-list/](https://www.geeksforgeeks.org/time-and-space-complexity-of-linked-list/) would claim O(1), but I have a feeling this is assuming a non-recursive solution. I'd imagine that height/depth would basically be the length of the linked list. So max space would be O(n), with a coefficient that correlates to the number and space complexity of the parameters being passed. This made me try and use the minimal # of arguments for traverse(). If anyone could clarify what the space complexity will be, and if it is a genuine concern in this case, that would be helpful!
5.  I found that every time I made any changes / added new operations, I'd also have to alter traverse() and this bothered me - it made me think coupling was too tight.
6.  Any other criticisms welcome!

```
<span class="hljs-keyword">function</span> <span class="hljs-title function_">linkedList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">let</span> head;
  <span class="hljs-keyword">let</span> tail;
  <span class="hljs-keyword">let</span> size = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">getTail</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// MAYBE: I could traverse instead of storing tail in memory</span>
    <span class="hljs-keyword">return</span> tail;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">getSize</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> size;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">getHead</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> head;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">checkIfSizeIs1</span>(<span class="hljs-params">newNodeReference</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-title function_">getSize</span>() === <span class="hljs-number">0</span>) {
      head = newNodeReference;
      tail = newNodeReference;
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">traverse</span>(<span class="hljs-params">
    conditionObject,
    mode = <span class="hljs-literal">null</span>,
    currentNode = head,
    currentIndex = <span class="hljs-number">0</span>,
    resultString = <span class="hljs-string">''</span>,
  </span>) {
    <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> calculate big O for time &amp; space</span>
    <span class="hljs-comment">// MAYBE: use loop instead</span>

    <span class="hljs-keyword">let</span> stopConditionMet = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">const</span> currentValue = currentNode.<span class="hljs-property">value</span>;

    stopConditionMet = evaluateCondition(conditionObject, mode, currentIndex, currentValue);

    <span class="hljs-comment">// BASE CASE</span>
    <span class="hljs-keyword">if</span> (stopConditionMet === <span class="hljs-literal">true</span>) {
      <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">'find'</span>) {
        <span class="hljs-keyword">return</span> currentIndex;
      }
      <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">'toString'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${resultString}</span>( <span class="hljs-subst">${currentNode.value}</span> ) -&gt; `</span> + <span class="hljs-string">' null'</span>;
        <span class="hljs-comment">// return resultString  + ' null';</span>
      }
      <span class="hljs-keyword">return</span> currentNode;
    }
    <span class="hljs-keyword">if</span> (currentNode === tail) <span class="hljs-keyword">return</span> currentNode;

    <span class="hljs-comment">// RECURSIVE CASE</span>

    resultString = resultString.<span class="hljs-title function_">concat</span>(<span class="hljs-string">`( <span class="hljs-subst">${currentNode.value}</span> )`</span>, <span class="hljs-string">'-&gt;'</span>);
    currentNode = currentNode.<span class="hljs-property">next</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-title function_">traverse</span>(conditionObject, mode, currentNode, currentIndex + <span class="hljs-number">1</span>, resultString);
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">evaluateCondition</span>(<span class="hljs-params">conditionObject, mode, currentIndex, currentValue</span>) {
    <span class="hljs-comment">// MAYBE: instead of using mode, assign "this" to static variable (which poiints to the caller function)</span>
    <span class="hljs-keyword">let</span> {
      condition1,
      condition2
    } = conditionObject;
    <span class="hljs-keyword">let</span> meetsCondition = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">switch</span> (mode) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'at'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'pop'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'toString'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'insertAt'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'removeAt'</span>:
        {
          condition2 = currentIndex;
          <span class="hljs-keyword">break</span>;
        }
      <span class="hljs-keyword">case</span> <span class="hljs-string">'contains'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'find'</span>:
        {
          condition2 = currentValue;
          <span class="hljs-keyword">break</span>;
        }

      <span class="hljs-attr">default</span>:
    }
    meetsCondition = condition1 === condition2;

    <span class="hljs-keyword">return</span> meetsCondition;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">at</span>(<span class="hljs-params">targetIndex</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-title function_">isIndexValid</span>(targetIndex);
      <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">traverse</span>({
        <span class="hljs-attr">condition1</span>: targetIndex
      }, <span class="hljs-string">'at'</span>);
      <span class="hljs-keyword">return</span> result;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
    }
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">if</span> (size &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Cannot pop, size is 0'</span>);
      <span class="hljs-keyword">const</span> last = { ...tail
      };

      tail.<span class="hljs-property">value</span> = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">const</span> secondToLast = <span class="hljs-title function_">traverse</span>({
        <span class="hljs-attr">condition1</span>: size - <span class="hljs-number">2</span>
      }, <span class="hljs-string">'pop'</span>); <span class="hljs-comment">// find 2nd to the last element</span>
      secondToLast.<span class="hljs-property">next</span> = <span class="hljs-literal">null</span>;
      <span class="hljs-comment">// set new tail value</span>
      tail = secondToLast;
      size -= <span class="hljs-number">1</span>;

      <span class="hljs-keyword">return</span> last;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
    }
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">contains</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-keyword">const</span> currentNode = <span class="hljs-title function_">traverse</span>({
      <span class="hljs-attr">condition1</span>: value
    }, <span class="hljs-string">'contains'</span>);

    <span class="hljs-keyword">return</span> currentNode.<span class="hljs-property">value</span> === value;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">find</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-keyword">const</span> index = <span class="hljs-title function_">traverse</span>({
      <span class="hljs-attr">condition1</span>: value
    }, <span class="hljs-string">'find'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Number</span>.<span class="hljs-title function_">isInteger</span>(index) ? index : <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// traverse will return currentNode (tail) if nothing is found. If found, it will return an index,</span>
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">toString</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">traverse</span>({
      <span class="hljs-attr">condition1</span>: size - <span class="hljs-number">1</span>
    }, <span class="hljs-string">'toString'</span>);
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">append</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-keyword">const</span> newNodeReference = <span class="hljs-title function_">node</span>(value);

    <span class="hljs-title function_">checkIfSizeIs1</span>(newNodeReference);

    <span class="hljs-title function_">getTail</span>().<span class="hljs-property">next</span> = newNodeReference;

    tail = newNodeReference;
    size++;

    <span class="hljs-keyword">return</span> newNodeReference;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">prepend</span>(<span class="hljs-params">value</span>) {
    <span class="hljs-keyword">const</span> newNodeReference = <span class="hljs-title function_">node</span>(value, head);

    <span class="hljs-title function_">checkIfSizeIs1</span>(newNodeReference);

    head = newNodeReference;
    size++;
    <span class="hljs-keyword">return</span> newNodeReference;
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">insertAt</span>(<span class="hljs-params">value, index</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-title function_">isIndexValid</span>(index);

      <span class="hljs-keyword">if</span> (index === <span class="hljs-number">0</span>) {
        <span class="hljs-title function_">prepend</span>(value);
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-keyword">if</span> (index === size - <span class="hljs-number">1</span>) {
        <span class="hljs-title function_">append</span>(value);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">const</span> insertionPoint = <span class="hljs-title function_">traverse</span>({
        <span class="hljs-attr">condition1</span>: index
      }, <span class="hljs-string">'insertAt'</span>);
      <span class="hljs-keyword">const</span> newNode = <span class="hljs-title function_">node</span>(value, insertionPoint.<span class="hljs-property">next</span>);
      insertionPoint.<span class="hljs-property">next</span> = newNode;
      size += <span class="hljs-number">1</span>;
      <span class="hljs-keyword">return</span> newNode;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
    }
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">removeAt</span>(<span class="hljs-params">index</span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-title function_">isIndexValid</span>(index);
      <span class="hljs-keyword">if</span> (index === <span class="hljs-number">0</span>) {
        aList.<span class="hljs-property">pop</span>;
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-keyword">const</span> nodeBeforeTarget = <span class="hljs-title function_">traverse</span>({
        <span class="hljs-attr">condition1</span>: index - <span class="hljs-number">1</span>
      }, <span class="hljs-string">'removeAt'</span>);
      <span class="hljs-keyword">const</span> removalTarget = { ...nodeBeforeTarget.<span class="hljs-property">next</span>
      };
      nodeBeforeTarget.<span class="hljs-property">next</span> = nodeBeforeTarget.<span class="hljs-property">next</span>.<span class="hljs-property">next</span>;
      <span class="hljs-keyword">if</span> (index === size - <span class="hljs-number">1</span>) {
        tail = nodeBeforeTarget;
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'NEW tail:'</span>, tail);
      }
      size -= <span class="hljs-number">1</span>;
      <span class="hljs-keyword">return</span> removalTarget;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
    }
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">isIndexValid</span>(<span class="hljs-params">targetIndex</span>) {
    <span class="hljs-keyword">if</span> (targetIndex + <span class="hljs-number">1</span> &gt; size) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">'Invalid Index'</span>);
    }
  }
  <span class="hljs-keyword">return</span> {
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
    removeAt,
  };
}

<span class="hljs-comment">// MAYBE: use undefined instead of null</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">node</span>(<span class="hljs-params">value = <span class="hljs-literal">null</span>, next = <span class="hljs-literal">null</span></span>) {
  <span class="hljs-keyword">return</span> {
    value,
    next
  };
}

<span class="hljs-comment">//TESTS</span>
<span class="hljs-keyword">const</span> aList = <span class="hljs-title function_">linkedList</span>();
aList.<span class="hljs-title function_">append</span>(<span class="hljs-number">2</span>);
aList.<span class="hljs-title function_">append</span>(<span class="hljs-number">5</span>);
aList.<span class="hljs-title function_">append</span>(<span class="hljs-number">4</span>);
aList.<span class="hljs-title function_">prepend</span>(<span class="hljs-number">10</span>);
aList.<span class="hljs-title function_">prepend</span>(<span class="hljs-number">7</span>);
aList.<span class="hljs-title function_">prepend</span>(<span class="hljs-number">8</span>);

<span class="hljs-keyword">const</span> at = aList.<span class="hljs-title function_">at</span>(<span class="hljs-number">4</span>);

<span class="hljs-keyword">const</span> contains = aList.<span class="hljs-title function_">contains</span>(<span class="hljs-number">8</span>);
<span class="hljs-keyword">const</span> find = aList.<span class="hljs-title function_">find</span>(<span class="hljs-number">1000</span>);

<span class="hljs-keyword">const</span> toString = aList.<span class="hljs-title function_">toString</span>();
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'toString:'</span>, toString);

<span class="hljs-keyword">const</span> [head, tail, size] = [aList.<span class="hljs-title function_">getHead</span>(), aList.<span class="hljs-title function_">getTail</span>(), aList.<span class="hljs-title function_">getSize</span>()];
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'head:'</span>, head);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'tail:'</span>, tail);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">'size:'</span>, size);
```

Run code snippet

Expand snippet

- [javascript](https://codereview.stackexchange.com/questions/tagged/javascript "show questions tagged 'javascript'")
- [beginner](https://codereview.stackexchange.com/questions/tagged/beginner "show questions tagged 'beginner'")
- [algorithm](https://codereview.stackexchange.com/questions/tagged/algorithm "show questions tagged 'algorithm'")
- [linked-list](https://codereview.stackexchange.com/questions/tagged/linked-list "show questions tagged 'linked-list'")
- [reinventing-the-wheel](https://codereview.stackexchange.com/questions/tagged/reinventing-the-wheel)

[Share](https://codereview.stackexchange.com/q/293786/275397 'Short permalink to this question')

[Edit](https://codereview.stackexchange.com/posts/293786/edit 'Revise and improve this post')

Delete

Flag

[edited 14 mins ago](https://codereview.stackexchange.com/posts/293786/revisions 'show all edits to this post')

asked 2 days ago

[

![bdng's user avatar](https://i.sstatic.net/K8RS0.jpg?s=64)

](https://codereview.stackexchange.com/users/275397/bdng)

[bdng](https://codereview.stackexchange.com/users/275397/bdng)

5133 bronze badges

New contributor

- 1

  [](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814# 'This comment adds something useful to the post')

  What will a linked-list be used for in your future Hash Map project?

  – [radarbob](https://codereview.stackexchange.com/users/10221/radarbob '7,804 reputation')

  [Commented 10 hours ago](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814#comment585508_293786)

- hi - The Odin Project uses linked lists for dealing with collisions in Hash Map. Each bucket will have a linked list, and add a node every time there's a collision. Note that the Hash Map will be also an educational project

  – [bdng](https://codereview.stackexchange.com/users/275397/bdng '51 reputation')

  [Commented 21 mins ago](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814#comment585527_293786)

[Add a comment](https://codereview.stackexchange.com/questions/293786/basic-linked-list-implementation-in-javascript/293814#293814# 'Use comments to reply to other users or notify them of changes. If you are adding new information, edit your post instead of commenting.')

## 2 Answers

Sorted by:

Highest score (default) Date modified (newest first) Date created (oldest first)

3

[](https://codereview.stackexchange.com/posts/293814/timeline)

Here's an eyeball review I'll expand on later with a rewrite suggestion if I have time.

Never swallow errors or log inside of methods that perform logic. Throw errors to the client of your code and let them log the result of the failure, retry the operation with different values, or take whatever other programmatic action they want. Doing I/O is noisy, not useful programmatically and can't be easily suppressed by the client. Pretend you're writing code for the JS standard library--it runs totally silently and you give full control over logging to the client.

Similarly, avoid `console.log` for tests. Use the builtin `assert` module, `console.assert`, or a real testing framework like Jest or Mocha with Chai which provide diffs, readability, scalability, reporting and standardized structure. Tests should be in a separate file/module or function from the rest of the code, and the main linked list module should export its class.

Going a step further, remove `console.log` from all of your code, except during development. Except for extremely rare cases, PRs and production code should never use it--it's noisy, slow, poses a security risk, and pollutes the code. Most serious codebases I've worked on ban it in CI.

Use `class LinkedList` syntax instead of `function linkedList`. Note the casing. Even if you are writing old school-style JS, use `new` when creating your instance instead of returning a bare object and using `function` as a closure.

Consider making `Node` a full-fledged class instead of an ad-hoc plain object.

Personally, I don't love `getFoo`, `getBar`, `getBaz`, `getQuux` everywhere. My rule for function naming is: if it's a getter, make it a noun without the `get` prefix. Otherwise, make it a verb. Maybe this is OK in Java, but I find it to be unaesthetic and nonstandard, and wouldn't suggest it in JS. More normal is to use [`getter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#using_getters_in_classes) and [`setter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#using_setters_in_classes) syntax, which let the caller access a property without a function call, but without sacrificing encapsulation.

Autoformat with [Prettier](https://prettier.io/playground/) and align with the JS community instead of inventing your own style.

Always use braces for blocks instead of relying on indentation. If you do use indentation, Prettier will make it a one-liner.

Avoid magic literals like `'toString'`. Pass real callback functions rather than strings that are later used to determine which function to call.

`aList.pop;` is a no-op. Functions need to be called to have an effect: `aList.pop()`.

Your tests should be far more comprehensive than the few cursory calls shown here. I haven't run your code, but there are likely other bugs in it. I suggest at least 20 or 30 non-overlapping tests that exercise all aspects of the class. Code slowly and test each method thoroughly, one at a time. Be paranoid and don't trust your code until it's been thoroughly tested.

This is particularly important if you're relying on a custom linked list implementation to build other abstractions on. If you rush into building a hash map on top of this without tests, when a subtle bug shows up in the hash (and it will!), how do you know the bug isn't with the linked list library?

Make sure functions are honest and transparent about what they do. `checkIfSizeIs1` actually checks if the list size is 0, then mutates state without telling the caller.

Avoid bare booleans: `if (stopConditionMet === true) {` should be `if (!stopConditionMet) {`.

`evaluateCondition(conditionObject, mode, currentIndex, currentValue) {` is a confusing an unnecessary function. If you have more than two parameters, the standard is to use a configuration object pattern. Avoid `condition1`, `condition2`\-type variables which are unnecessary code smell. Give them non-numeric names, or use a predicate function for arbitrary condition tests.

Always use `===`, never `==`, which coerces values to be equal that should never be, like `0 == false` and `"42" == 42`.

Link lists arguably should not offer O(n) `at`/`find`/`insertAt`/`removeAt` operations. I know these are in many standard library implementations, but if you're ever actually using these, you're probably using the wrong data structure.

If random access is important, use an array which will almost certainly be way more performant than a hand-rolled linked list. Removing these footgun operations solves your `traverse` and `evaluateCondition` design problems because you can throw them out entirely. If you do need to keep these, generators, iterators and callback functions will solve your design problems without resorting to `if`s and string parameters to control what sort of traversal occurs.

Does `append` really need to return the value the caller just appended? The caller already has the value and all calls to it ignore the return, so this feels like a sloppy contract.

Consider using TypeScript, JSDocs with annotations that describe your methods, arguments and return values. Avoid inline comments--they usually indicate the code needs to be clarified or broken up.

Never use recursion with linked lists. JS has a call stack that can handle only a few thousand recursive calls. Linear data structures that can't be longer than ~3k elements are practically useless.

Only use recursion for logarithmic data structures like balanced trees, or in languages that natively support tail recursion. Otherwise, use iteration. The code will be easier to read and write and will run faster, without using unnecessary space.

Always use all variables you define. Some of the variables in "tests" were never logged, like `const at`, `const contains` and `const find`. Use [ESLint](https://eslint.org/play/) to pick up these mistakes.

Taking a step back, link lists are pointless data structures in JS. I'd wager arrays are better for pretty much 99.9% of real use cases. Feel free to provide a counterexample--I'd be genuinely curious to see one used in a real project. I understand this is an educational exercise, though, but worth keeping in mind.
