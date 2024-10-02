
$(document).ready(function() {
    // Function to fetch and display data

    function hideAllSections() {
        $('#data-section').hide();
        $('#add-form-section').hide();
        $('#delete-section').hide();
        $('#update-section').hide();
    }

    // Initially hide all sections
    hideAllSections();

    // Show data section and hide others
    $('#show-data-section').on('click', function() {
        hideAllSections();  // Hide all sections
        $('#data-section').show();  // Show data section
    });

    // Show add form section and hide others
    $('#show-add-form').on('click', function() {
        hideAllSections();  // Hide all sections
        $('#add-form-section').show();  // Show add form section
    });

    // Show delete section and hide others
    $('#show-delete-section').on('click', function() {
        hideAllSections();  // Hide all sections
        $('#delete-section').show();  // Show delete section
    });

    // Show update section and hide others
    $('#show-update-section').on('click', function() {
        hideAllSections();  // Hide all sections
        $('#update-section').show();  // Show update section
    }); 

    function fetchData() {
        $.ajax({
            url: '/data',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var dataContainer = $('#data-container');
                dataContainer.empty(); // Clear existing content

                $.each(data, function(index, row) {
                    var tableRow = $('<tr>');
                    tableRow.append('<td>' + row.ID + '</td>');
                    tableRow.append('<td>' + row.name + '</td>');
                    tableRow.append('<td>' + row.CNIC + '</td>');
                    tableRow.append('<td>' + row.Course + '</td>');
                    tableRow.append('<td>' + row.Grade + '</td>');
                    tableRow.append('<td>' + row.GPA + '</td>');
                    dataContainer.append(tableRow);
                //     var div = $('<div>');
                //     div.html('ID: ' + row.ID + '  Name:  ' + row.name + '    CNIC:  ' + row.CNIC + '    Course:  ' + row.Course+ '    Grade:  ' + row.Grade+ '    GPA:  ' + row.GPA);
                //     dataContainer.append(div);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });}
      // Set up the click event handler for the fetch button
      $('#fetch-data-button').on('click', function() {
        fetchData(); // Call the fetchData function when the button is clicked
    });


    $('#form').on('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        
        var formData = {
            name1: $('#name').val(),
            CNIC: $('#CNIC').val(),
            Grade: $('#Grade').val(),
            Course: $('#Course').val(),
            GPA: $('#GPA').val()
            
        };
        
        $.ajax({
            url: '/add-data',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert(response)
                
            },
            error: function(xhr, status, error) {
                alert('Error adding data:', error);
            }
        });
    });
    
    $('#delete-button').on('click',function(){

        var userID = $('#delete-id').val();
    
        if(userID){
            $.ajax({
                url: `/delete-user/${userID}`,
                method: 'DELETE',
                success: function(response) {
                    alert(response);
                    
                },
                error: function(error) {
                    alert('Error deleting data:', error);
                }
    
    
            });
    
        }
        else{
            alert("Please Enter an ID To delete");
        }
    
    });

    // $('#update-button').on('click', function() {
    //     var userId = $('#update-id').val();
    //     var updateName = $('#update-name').val();
    //     var updateCnic = $('#update-cnic').val();
    //     var updateCourse = $('#update-course').val();
    //     var updateGrade = $('#update-grade').val();
    //     var updateGpa = $('#update-gpa').val();
    
    // var updateData = {};
    // if(updateName) updateData.name = updateName;
    // if(updateCnic) updateData.CNIC = updateCnic;
    // if(updateCourse) updateData.Course = updateCourse;
    // if(updateGrade) updateData.Grade = updateGrade;
    // if(updateGpa) updateData.GPA = updateGpa;
    //     // Check if all fields are filled
    //     if (userId && Object.keys(updateData).length > 0) {
    //         $.ajax({
    //             url: `/update-user/${userId}`,
    //             method: 'PUT',
    //             contentType: 'application/json',
    //             data: JSON.stringify(updateData),
    //             success: function(response) {
    //                 alert(response.message);
    //             },
    //             error: function(xhr, status, error) {
    //                 alert('Error updating user:', error);
    //             }
    //         });
    //     } else {
    //         alert("Please enter ID and atleast one field");
    //     }
    // }); 
    
    $('#update-button').on('click', function() {
        var userId = $('#update-id').val();
        var updateName = $('#update-name').val();
        var updateCnic = $('#update-cnic').val();
        var updateCourse = $('#update-course').val();
        var updateGrade = $('#update-grade').val();
        var updateGpa = $('#update-gpa').val();
    
        var updateData = {};
        if (updateName) updateData.name = updateName;
        if (updateCnic) updateData.CNIC = updateCnic;
        if (updateCourse) updateData.Course = updateCourse;
        if (updateGrade) updateData.Grade = updateGrade;
        if (updateGpa) updateData.GPA = updateGpa;
    
        // Check if the ID and any field to update are provided
        if (userId && Object.keys(updateData).length > 0) {
            $.ajax({
                url: `/update-user/${userId}`, // Ensure userId is passed correctly
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updateData),
                success: function(response) {
                    alert(response.message);
                },
                error: function(xhr, status, error) {
                    alert('Error updating user:', error);
                }
            });
        } else {
            alert("Please enter ID and at least one field");
        }
    });
    
});
