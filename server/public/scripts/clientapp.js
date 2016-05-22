var completion = {};
$(document).ready(function() {
    addListItems();
    $('#submit').on('click', postItem);
    $('.todo-items').on('click', '.delete', deleteItem);
    $('.todo-items').on('click', '.update', updateStatus);
});

function addListItems() {
    $('#todo-items-complete').empty();
    $('#todo-items-incomplete').empty();
    $.ajax({
        type: 'GET',
        url: '/todo',
        success: function(items) {
            console.log(items);
            items.forEach(function(item) {
                $container = $('<tr></tr>');
                var itemProperties = ['name', 'description'];
                itemProperties.forEach(function(prop) {
                    var $el = $('<td>' + item[prop] + '</td>');
                    $container.append($el);
                });
                console.log(item.id);
                $container.data('itemID', item.id);
                $container.data('name', item.name);
                $container.data('complete', item.complete);
                $container.append('<td><button class="delete">Delete</button></td>');
                if (item.complete) {
                    $container.append('<td>Complete</td><td><button class="unfinished update">Set to Incomplete</button></td>');
                    $container.addClass('complete');
                    $('#todo-items-complete').append($container);

                } else {
                    $container.append('<td>Incomplete</td><td><button class="finished update">Set to Complete</button></td>');
                    $container.addClass('incomplete');
                    $('#todo-items-incomplete').append($container);

                }
            });
        }
    });
}

function postItem() {
    event.preventDefault();

    var item = {};

    $.each($('#taskform').serializeArray(), function(i, field) {
        item[field.name] = field.value;

    });

    $.ajax({
        type: 'POST',
        url: '/todo',
        data: item,
        success: function(data) {
            addListItems();
        }
    });
}

function deleteItem() {
    event.preventDefault();
    var $name = $(this).closest('tr').data('name');
    var itemID = $(this).closest('tr').data('itemID');
    var delTask = confirm('Are you sure you want to delete ' + $name + '?');
    if (delTask === true) {

        $.ajax({
            type: 'DELETE',
            url: '/todo/' + itemID,
            success: function() {
                addListItems();
            }
        });
    }
}

function updateStatus() {
    event.preventDefault();
    if ($(this).closest('tr').hasClass('incomplete')) {
        completion.value = true;
    } else {
        completion.value = false;
    }
    var itemID = $(this).closest('tr').data('itemID');
    $.ajax({
        type: 'PUT',
        url: '/todo/' + itemID,
        data: completion,
        success: function() {
            addListItems();
        }
    });
}
