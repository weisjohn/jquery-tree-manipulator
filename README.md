jquery-tree-manipulator
=============

a depth-first walker for manipulating an arbitrary DOM tree

`jquery-tree-manipulator` was born out of a need to integrate with http://blog.yesmeck.com/jquery-jsonview/ without rebuilding the whole thing.

### usage

`sample.html`:

```html
<div class="tree">
    <ul>
        <li>
            <span>foo</span>
        </li>
        <li>
            <span class="collapser">-</span>
            <span>bar</span>
            <ul>
                <li>bat</li>
                <li>baz</li>
                <li>bin</li>
                <span class="collapser">-</span>
                <ul>
                    <li>cat</li>
                </ul>
            </ul>
        </li>
    </ul>
</div>
```

`sample.js`:

```javascript
$(".tree").treeManipulator({
    structure: "> ul > li",
    opened: ".collapser:contains('-')",
    closed: ".collapser:contains('+')"
});
```

`jquery-tree-manipulator` requires you tell it how to traverse your tree. You must provide three selectors for it to know how to traverse, open, and close the DOM nodes.

You can then invoke the `close` and `open` methods on the plugin, optionally passing a `depth` limit as an argument, such as:

```javascript
// close all nodes
$(".tree").treeManipulator('close');
// open the first level
$(".tree").treeManipulator('open', 1);
```
