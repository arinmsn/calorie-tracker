// Storage Controller

// Item Controller
const ItemCtrl = (function() {
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
   }

   // Data structure (state)
   const data = {
       items: [
            // {id:0, name: 'Steak Dinner', calories: 2000},
            // {id:1, name: 'Shake', calories: 750},
        ],
       currentItem: null, // when specific item is selected
       totalCalories: 0
   }

   // Public access
   return {
       getItems: function() {
           return data.items;
       },
       addItem: function(name, calories) {
           let ID;
            // Create unique id for each item
            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Parse Calories as a number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items' array
            data.items.push(newItem);
            return newItem;
        },
       logData: function() {
           return data;
       }
   }
})();

// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    // Public access
    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
            });

            // Insert items         7:54
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem(item){
            // Show the list 
            document.querySelector(UISelectors.itemList).style.display = 'block';

            // Create <li> element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';

            // Add ID 
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;

            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {

    // Load event listeners
    const loadEventListeners = function(){
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){
        // Get from input from UI controller
        const input = UICtrl.getItemInput();
        // Check for input (name & calories)
        // console.log(input);
        if (input.name !== '' && input.calories !== ''){
            // Adding item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            
            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    // Public access
    return {
        init: function(){
        // Fetch items from data structure
        const items = ItemCtrl.getItems();

        // Check if any items
        if (items.length === 0){
            UICtrl.hideList();
        } else {
            // Populate list
            UICtrl.populateItemList(items);
        }
           
        //Load event listeners
        loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

// Initializing app
App.init();