




$(document).ready(function () {
    

/*FORM BUILDER Start*/
    $(".form_bal_banner").draggable({
        helper: function () {
            return getBannerFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_RankTable").draggable({
        helper: function () {
            return getScoreRankHTML();
        },
        connectToSortable: ".form_builder_area"
    })
    $(".form_bal_titlefeild").draggable({
        helper: function () {
            return getTitleFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_listgroup").draggable({
        helper: function () {
            return getListGroupHTML();
        },
        connectToSortable: ".form_builder_area"
        
    })
    $(".form_bal_text").draggable({
        helper: function () {
            return getTextHTML();
        },
        connectToSortable: ".form_builder_area"
    })
    $(".form_bal_textfield").draggable({
        helper: function () {
            return getTextFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_textarea").draggable({
        helper: function () {
            return getTextAreaFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_number").draggable({
        helper: function () {
            return getNumberFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_email").draggable({
        helper: function () {
            return getEmailFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_password").draggable({
        helper: function () {
            return getPasswordFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_date").draggable({
        helper: function () {
            return getDateFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_button").draggable({
        helper: function () {
            return getButtonFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_select").draggable({
        helper: function () {
            return getSelectFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_radio").draggable({
        helper: function () {
            return getRadioFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });
    $(".form_bal_checkbox").draggable({
        helper: function () {
            return getCheckboxFieldHTML();
        },
        connectToSortable: ".form_builder_area"
    });

    $(".form_builder_area").sortable({
        cursor: 'move',
        placeholder: 'placeholder',
        start: function (e, ui) {
            ui.placeholder.height(ui.helper.outerHeight());
        },
        stop: function (ev, ui) {
            getPreview();
        }
    });
    $(".form_builder_area").disableSelection();


    function getBannerFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="banner" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="file" name="label_' + field + '" class=" form_input_file" value="Form Title" data-field="' + field + '" /></div></div> </div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getListGroupHTML() {
        var field = generateField();
        var option = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div><hr/><div class="row li_row form_output" data-type="listGroup" data-field="' + field + '"><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' + field + '"><div data-field="' + field + '" class="row listgroupMargin listgroup_row_' + field + '" data-opt="' + option + '"><hr/><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="l_lable form-control"/></div></div><div class="col-md-4"><div class="form-group"><select name="listGroupSelect" class="l_select form-control"><option value="s">Sessions</option><option value="i">Text Field</option></select></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_listitem" data-field="' + field + '"></i></div><hr/></div></div></div></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }

    function getTitleFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="title" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Form Title" data-field="' + field + '" /></div></div></div>'
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getTextHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="nonTextField" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html)
    }
    function getScoreRankHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="ScoreRankTable" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><lable>Name</lable><input type="text" name="label_' + field + '" class="form-control form_input_label sr_name" value="Name" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><lable>First Title</lable><input type="text" name="label_' + field + '" class="form-control form_input_label title1" value="Title_one" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><lable>Second Title</lable><input type="text" name="label_' + field + '" class="form-control form_input_label title2" value="Title_2" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><lable>Range</lable><input type="number" max="10" min="1" name="label_' + field + '" class="form-control form_input_label range" value="Range" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><lable>Catergories (<small>place a comma "," between each category)</small></lable><textarea name="label_' + field + '" class="form-control form_input_label lableArray" data-field="' + field + '"></textarea></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getButtonFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="button" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="class_' + field + '" class="form-control form_input_button_class" placeholder="Class" value="btn btn-primary" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="value_' + field + '" data-field="' + field + '" class="form-control form_input_button_value" value="Submit" placeholder="Value"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getTextFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="text" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getNumberFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="number" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getEmailFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="email" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getPasswordFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="password" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getDateFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="date" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getTextAreaFieldHTML() {
        var field = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div></div><hr/><div class="row li_row form_output" data-type="textarea" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="placeholder_' + field + '" data-field="' + field + '" class="form-control form_input_placeholder" placeholder="Placeholder"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-check"><label class="form-check-label"><input data-field="' + field + '" type="checkbox" class="form-check-input form_input_req">Required</label></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getSelectFieldHTML() {
        var field = generateField();
        var opt1 = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div><hr/><div class="row li_row form_output" data-type="select" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-group"><select name="select_' + field + '" class="form-control"><option data-opt="' + opt1 + '" value="Value">Option</option></select></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' + field + '"><div data-field="' + field + '" class="row select_row_' + field + '" data-opt="' + opt1 + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="s_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="s_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_select" data-field="' + field + '"></i></div></div></div></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getRadioFieldHTML() {
        var field = generateField();
        var opt1 = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div><hr/><div class="row li_row form_output" data-type="radio" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-group"><div class="mt-radio-list radio_list_' + field + '"><label class="mt-radio mt-radio-outline"><input data-opt="' + opt1 + '" type="radio" name="radio_' + field + '" value="Value"> <p class="r_opt_name_' + opt1 + '">Option</p><span></span></label></div></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' + field + '"><div data-field="' + field + '" class="row radio_row_' + field + '" data-opt="' + opt1 + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="r_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="r_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '"></i></div></div></div></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }
    function getCheckboxFieldHTML() {
        var field = generateField();
        var opt1 = generateField();
        var html = '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-primary btn-sm remove_bal_field pull-right" data-field="' + field + '"><i class="fa fa-times"></i></button></div></div><hr/><div class="row li_row form_output" data-type="checkbox" data-field="' + field + '"><div class="col-md-12"><div class="form-group"><input type="text" name="label_' + field + '" class="form-control form_input_label" value="Label" data-field="' + field + '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" name="text_' + field + '" class="form-control form_input_name" placeholder="Name"/></div></div><div class="col-md-12"><div class="form-group"><div class="mt-checkbox-list checkbox_list_' + field + '"><label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + opt1 + '" type="checkbox" name="checkbox_' + field + '" value="Value"> <p class="c_opt_name_' + opt1 + '">Option</p><span></span></label></div></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' + field + '"><div data-field="' + field + '" class="row checkbox_row_' + field + '" data-opt="' + opt1 + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="c_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="c_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" data-field="' + field + '"></i></div></div></div></div></div></div>';
        return $('<div>').addClass('li_' + field + ' form_builder_field').html(html);
    }


    $(document).on('click', '.add_more_listitem', function () {
        $(this).closest('.form_builder_field').css('height', 'auto');
        var field = $(this).attr('data-field');
        var option = generateField();
        var list_group_item = '';
        $('.field_extra_info_' + field).append('<div data-field="' + field + '" class="row listgroupMargin listgroup_row_' + field + '" data-opt="' + option + '"><hr/><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="l_lable form-control"/></div></div><div class="col-md-4"><div class="form-group"><select name="listGroupSelect" class="l_select form-control"><option value="s">Sessions</option><option value="i">Text Field</option></select></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_listitem" data-field="' + field + '"></i><i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_listitem" data-field="' + field + '"></i></div></div>');

        getPreview();
    })

    $(document).on('click', '.add_more_select', function () {
        $(this).closest('.form_builder_field').css('height', 'auto');
        var field = $(this).attr('data-field');
        var option = generateField();
        $('.field_extra_info_' + field).append('<div data-field="' + field + '" class="row select_row_' + field + '" data-opt="' + option + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="s_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="s_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_select" data-field="' + field + '"></i><i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_select" data-field="' + field + '"></i></div></div>');
        var options = '';
        $('.select_row_' + field).each(function () {
            var opt = $(this).find('.s_opt').val();
            var val = $(this).find('.s_val').val();
            var s_opt = $(this).attr('data-opt');
            options += '<option data-opt="' + s_opt + '" value="' + val + '">' + opt + '</option>';
        });
        $('select[name=select_' + field + ']').html(options);
        getPreview();
    });
    $(document).on('click', '.add_more_radio', function () {
        $(this).closest('.form_builder_field').css('height', 'auto');
        var field = $(this).attr('data-field');
        var option = generateField();
        $('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row radio_row_' + field + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="r_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="r_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_radio" data-field="' + field + '"></i><i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_radio" data-field="' + field + '"></i></div></div>');
        var options = '';
        $('.radio_row_' + field).each(function () {
            var opt = $(this).find('.r_opt').val();
            var val = $(this).find('.r_val').val();
            var s_opt = $(this).attr('data-opt');
            options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" value="' + val + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
        });
        $('.radio_list_' + field).html(options);
        getPreview();
    });
    $(document).on('click', '.add_more_checkbox', function () {
        $(this).closest('.form_builder_field').css('height', 'auto');
        var field = $(this).attr('data-field');
        var option = generateField();
        $('.field_extra_info_' + field).append('<div data-opt="' + option + '" data-field="' + field + '" class="row checkbox_row_' + field + '"><div class="col-md-4"><div class="form-group"><input type="text" value="Option" class="c_opt form-control"/></div></div><div class="col-md-4"><div class="form-group"><input type="text" value="Value" class="c_val form-control"/></div></div><div class="col-md-4"><i class="margin-top-5 fa fa-plus-circle fa-2x default_blue add_more_checkbox" data-field="' + field + '"></i><i class="margin-top-5 margin-left-5 fa fa-times-circle default_red fa-2x remove_more_checkbox" data-field="' + field + '"></i></div></div>');
        var options = '';
        $('.checkbox_row_' + field).each(function () {
            var opt = $(this).find('.c_opt').val();
            var val = $(this).find('.c_val').val();
            var s_opt = $(this).attr('data-opt');
            options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" value="' + val + '"> <p class="c_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
        });
        $('.checkbox_list_' + field).html(options);
        getPreview();
    });

    $(document).on('keyup', '.l_lable', function () {
        getPreview();
    });
    $(document).on('change', '.l_select', function () {
        getPreview()
    })
    $(document).on('keyup', '.s_opt', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').html(op_val);
        getPreview();
    });
    $(document).on('keyup', '.s_val', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('select[name=select_' + field + ']').find('option[data-opt=' + option + ']').val(op_val);
        getPreview();
    });
    $(document).on('keyup', '.r_opt', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('.radio_list_' + field).find('.r_opt_name_' + option).html(op_val);
        getPreview();
    });
    $(document).on('keyup', '.r_val', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('.radio_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
        getPreview();
    });
    $(document).on('keyup', '.c_opt', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('.checkbox_list_' + field).find('.c_opt_name_' + option).html(op_val);
        getPreview();
    });
    $(document).on('keyup', '.c_val', function () {
        var op_val = $(this).val();
        var field = $(this).closest('.row').attr('data-field');
        var option = $(this).closest('.row').attr('data-opt');
        $('.checkbox_list_' + field).find('input[data-opt=' + option + ']').val(op_val);
        getPreview();
    });
    $(document).on('click', '.edit_bal_textfield', function () {
        var field = $(this).attr('data-field');
        var el = $('.field_extra_info_' + field);
        el.html('<div class="form-group"><input type="text" name="label_' + field + '" class="form-control" placeholder="Enter Text Field Label"/></div><div class="mt-checkbox-list"><label class="mt-checkbox mt-checkbox-outline"><input name="req_' + field + '" type="checkbox" value="1"> Required<span></span></label></div>');
        getPreview();
    });
    $(document).on('click', '.remove_bal_field', function (e) {
        e.preventDefault();
        var field = $(this).attr('data-field');
        $(this).closest('.li_' + field).hide('400', function () {
            $(this).remove();
            getPreview();
        });
    });
    $(document).on('click', '.remove_more_listitem', function () {
        var field = $(this).attr('data-field');
        console.log("b4 remove f=> "+field);
        $(this).closest('.listgroup_row_' + field).hide('400', function () {
            $(this).remove();
            getPreview();
            console.log("af remove");
        });
    });
    $(document).on('click', '.remove_more_select', function () {
        var field = $(this).attr('data-field');
        $(this).closest('.select_row_' + field).hide('400', function () {
            $(this).remove();
            var options = '';
            $('.select_row_' + field).each(function () {
                var opt = $(this).find('.s_opt').val();
                var val = $(this).find('.s_val').val();
                var s_opt = $(this).attr('data-opt');
                options += '<option data-opt="' + s_opt + '" value="' + val + '">' + opt + '</option>';
            });
            $('select[name=select_' + field + ']').html(options);
            getPreview();
        });
    });
    $(document).on('click', '.remove_more_radio', function () {
        var field = $(this).attr('data-field');
        $(this).closest('.radio_row_' + field).hide('400', function () {
            $(this).remove();
            var options = '';
            $('.radio_row_' + field).each(function () {
                var opt = $(this).find('.r_opt').val();
                var val = $(this).find('.r_val').val();
                var s_opt = $(this).attr('data-opt');
                options += '<label class="mt-radio mt-radio-outline"><input data-opt="' + s_opt + '" type="radio" name="radio_' + field + '" value="' + val + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
            });
            $('.radio_list_' + field).html(options);
            getPreview();
        });
    });
    $(document).on('click', '.remove_more_checkbox', function () {
        var field = $(this).attr('data-field');
        $(this).closest('.checkbox_row_' + field).hide('400', function () {
            $(this).remove();
            var options = '';
            $('.checkbox_row_' + field).each(function () {
                var opt = $(this).find('.c_opt').val();
                var val = $(this).find('.c_val').val();
                var s_opt = $(this).attr('data-opt');
                options += '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' + s_opt + '" name="checkbox_' + field + '" type="checkbox" value="' + val + '"> <p class="r_opt_name_' + s_opt + '">' + opt + '</p><span></span></label>';
            });
            $('.checkbox_list_' + field).html(options);
            getPreview();
        });
    });
    $(document).on('keyup', '.form_input_button_class', function () {
        getPreview();
    });
    $(document).on('keyup', '.form_input_button_value', function () {
        getPreview();
    });
    $(document).on('change', '.form_input_file', function () {
        console.log("changed")
        getPreview();
    });
    $(document).on('change', '.form_input_req', function () {
        getPreview();
    });
    $(document).on('keyup', '.form_input_placeholder', function () {
        getPreview();
    });
    $(document).on('keyup', '.form_input_label', function () {
        getPreview();
    });
    $(document).on('keyup', '.form_input_name', function () {
        getPreview();
    });
    function generateField() {
        return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
    }

    function getPreview(plain_html = '') {
        var el = $('.form_builder_area .form_output');
        var html = '';
        el.each(function () {
            var data_type = $(this).attr('data-type');
            var field = $(this).attr('data-field');
            var label = $(this).find('.form_input_label').val();
            var name = $(this).find('.form_input_name').val();
            if (data_type === 'banner') {
                let imgSrc;
                if ($(this).children("div").children("div").children("input")[0].files.length === 1) {
                    let file = $(this).children("div").children("div").children("input")[0].files[0];
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        console.log(e.target.result);
                        $(`[data-img-id="${field}"]`).attr("src", e.target.result);
                    }
                    reader.readAsDataURL(file);
                } else {
                    imgSrc = "https://via.placeholder.com/250x100.png?text=250x100+image+size"
                }
                let banner = '<div  class="form-group"><img data-img-id="' + field + '" src="' + imgSrc + '" style="width:100%;height:10rem"/></div>'
                return html += banner;
            }
            if (data_type === 'title') {
                return html += '<div id="title-mutation" class="form-group text-center"><h3>'+ label +'</h3></div>'
            }
            if (data_type === 'listGroup') {
                var list_group_items = '';
                let selected_input = '';
                $('.listgroup_row_' + field).each(function (i, el) {
                    console.log($(el));
                    if ($(this).find('.l_select').val() === 's') {
                        selected_input = '<select name="' + $(el).find("input[type=text]").val() + '" class=" ml-3 form-control form-control-sm">'+ Sessions + '</select>';
                        
                    }
                    if ($(this).find('.l_select').val() === 'i') {
                        selected_input = '<input type="text" name="' + $(el).find("input[type=text]").val() + '" class=" ml-3 form-control form-control-sm;"/>';
                    }

                    list_group_items += '<li class="list-group-item d-flex justify-content-between align-items-center">' + $(el).find("input[type=text]").val() + ' ' + selected_input + '</li>'
                })
                return html+= '<div class="form-group"><ul class="list-group">' + list_group_items + '</ul></div>';
            }
            if (data_type === 'nonTextField') {
                html += '<div class="form-group"><p>' + label + '</p></div> ';
            }
            if (data_type === 'ScoreRankTable') {
                var t_name = $(this).find(".sr_name").val()
                var title1 = $(this).find(".title1").val();
                var title2 = $(this).find(".title2").val()
                var range = $(this).find(".range").val();
                var labels = $(this).find(".lableArray").val().split(',');
                var labelArray = labels.toString().split(',');
                var tr = '';
                labelArray.forEach((row, i,parent) => {
                    console.log(row);
                    let temptr = '<tr> <th class="labels">' + parent[i] + '</th>'
                    for (var i = 0; i < Number(range); i++) {
                        temptr+= '<td> <input type="radio" class="form-check-input"/></td>'
                    }
                    temptr + '</tr>';
                    tr += temptr;
                })
                console.log(t_name)
                var table = `<div class="form-group"><span data="${t_name}"><p class="title1">${title1}</p><table class="table table-sm"> <tr><td class="title2" colspan="${Number(range)+1}">${title2}</td></tr>${tr}</table></span></div>`

                html += table;
            }
            if (data_type === 'text') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="text" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'number') { 
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="number" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'email') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="email" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'password') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="password" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'textarea') {
                var placeholder = $(this).find('.form_input_placeholder').val();
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><textarea rows="5" name="' + name + '" placeholder="' + placeholder + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'date') {
                var checkbox = $(this).find('.form-check-input');
                var required = '';
                if (checkbox.is(':checked')) {
                    required = 'required';
                }
                html += '<div class="form-group"><label class="control-label">' + label + '</label><input type="date" name="' + name + '" class="form-control" ' + required + '/></div>';
            }
            if (data_type === 'button') {
                var btn_class = $(this).find('.form_input_button_class').val();
                var btn_value = $(this).find('.form_input_button_value').val();
                html += '<button name="' + name + '" type="submit" class="' + btn_class + '">' + btn_value + '</button>';
            }
            if (data_type === 'select') {
                var option_html = '';
                $(this).find('select option').each(function () {
                    var option = $(this).html();
                    var value = $(this).val();
                    option_html += '<option value="' + value + '">' + option + '</option>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label><select class="form-control" name="' + name + '">' + option_html + '</select></div>';
            }
            if (data_type === 'radio') {
                var option_html = '';
                $(this).find('.mt-radio').each(function () {
                    var option = $(this).find('p').html();
                    var value = $(this).find('input[type=radio]').val();
                    option_html += '<div class="form-check"><label class="form-check-label"><input type="radio" class="form-check-input" name="' + name + '" value="' + value + '">' + option + '</label></div>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
            }
            if (data_type === 'checkbox') {
                var option_html = '';
                $(this).find('.mt-checkbox').each(function () {
                    var option = $(this).find('p').html();
                    var value = $(this).find('input[type=checkbox]').val();
                    option_html += '<div class="form-check"><label class="form-check-label"><input type="checkbox" class="form-check-input" name="' + name + '[]" value="' + value + '">' + option + '</label></div>';
                });
                html += '<div class="form-group"><label class="control-label">' + label + '</label>' + option_html + '</div>';
            }
        });
        if (html.length) {
            $('.export_html').show();
        } else {
            $('.export_html').hide();
        }
        if (plain_html === 'html') {

            let jsonToSend = []
            $('.preview').hide();
            $('.plain_html').show().find('textarea').val(html);


            $(".preview .form-group").each((i, e) => {
                let childNodesLength = e.childNodes.length;
                let childNodes;
                let childNodeObj = {}

                childNodes = e.childNodes

                childNodes.forEach((node, i) => {
                    let switchValue = node.nodeName
                    switch (switchValue) {
                        case "IMG":
                            childNodeObj.Name = "ImageBanner"
                            childNodeObj.InputType = "Image"
                            childNodeObj.Data = $(node).attr('src').split(',')[1];
                            break;
                        case "P":
                            childNodeObj.Name = "IntroductoryMsg"
                            childNodeObj.Label = node.textContent
                            childNodeObj.InputType = "Label"
                            break;
                        case "H3":
                            childNodeObj.Name = "Title"
                            childNodeObj.Label = childNodes[0].textContent
                            childNodeObj.InputType = "Heading"

                            break;
                        case "UL":
                            childNodeObj.Name = "listgroup"
                            childNodeObj.InputType = "Table"
                            childNodeObj.RowArray = [];
                            node.childNodes.forEach((child, key, parent) => {
                                if ($(child).html().toString().includes("select")) {
                                    let tempChild = $(child).children("select");
                                    let opts = []
                                    for (var i = 0; i < tempChild[0].options.length; i++) {
                                        opts.push(tempChild[0].options[i].label);
                                    }
                                    console.log()
                                    childNodeObj.RowArray.push({ Lable: $(child)[0].childNodes[0].textContent, Options: opts })
                                } else {
                                    childNodeObj.RowArray.push({ Label: child.textContent })
                                }
                            })
                            break;
                        case "SPAN":
                            childNodeObj.Name = $(node).attr("data");
                            childNodeObj.Label = $(node).find(".title1").text();
                            childNodeObj.SubLabel = $(node).find(".title2").text();
                            childNodeObj.InputType = "RankTable"
                            childNodeObj.LabelArray = []

                            $(node).find("table th").each((index, el) => {
                                childNodeObj.LableArray.push(el.textContent)
                            })
                            childNodeObj.Range = Number($(node).find(".title2").attr("colspan")) - 1;
                            break
                        case "LABEL":
                            childNodeObj.Label = node.textContent
                            break;
                        case "INPUT":
                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.DataType = $(node).attr("type")
                            childNodeObj.InputType = "Entry"
                            childNodeObj.Required = $(node).attr("required") ? true : false;
                            break;
                        case "TEXTAREA":

                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.InputType = "Editor"
                            childNodeObj.Required = $(node).attr("required") ? true : false;
                            break;
                        case "SELECT":
                            childNodeObj.Name = $(node).attr("name")
                            childNodeObj.InputType = "Select"



                            let opt = []
                            for (var i = 0; i < $(node)[0].options.length; i++) {
                                opt.push($(node)[0].options[i].label)
                            }
                            childNodeObj.Options = opt
                            break;
                        case "DIV":
                            if ($(node).hasClass("isTable")) {
                                switchValue = 'TABLE';
                            }
                            if ($(node).children("label").children(":input").attr("type") == "radio" || "RADIO") {
                                console.log("NODE => ", node)
                                childNodeObj.Name = $(node).children("label").children(":input").attr("name")
                                childNodeObj.InputType = "RadioButton"
                                if (childNodeObj.hasOwnProperty("Options")) {
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                } else {
                                    childNodeObj.Options = []
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                }
                            } else if ($(node).children("div lable :input").attr("type") == "checkbox" || "CHECKBOX") {
                                childNodeObj.Name = $(node).children(" div lable :input").attr("name")
                                childNodeObj.InputType = "CheckBox"
                                if (childNodeObj.hasOwnProperty("Options")) {
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                } else {
                                    childNodeObj.Options = []
                                    childNodeObj.Options.push($(node).children("label").children(":input").val())
                                }
                            }
                            break;
                        case "RADIO":
                            break;
                    }


                })
                jsonToSend.push(childNodeObj);

            })


            let _data = {
                'Title': $("#title-mutation h3").text(),
                'Html': `${$('.preview').html()}`,
                'JsonForm' : jsonToSend
            }
            
            $.ajax({
                type:"POST",
                url: `/api/Forms`,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(_data),
                success: (res) => {
                    iziToast.success({
                        title: 'Form',
                        message: "Form Added successfully",
                    })
                },
                error: (err) => {
                    iziToast.error({
                        title: 'Form',
                        message: "An error occured while adding the form",
                    })
                }
            })
            
        } else {
            $('.plain_html').hide();
            $('.preview').html(html).show();
    }
    }
    $(document).on('click', '.export_html', function () {
        getPreview('html');
    });

    /*FORM BUILDER End */

    
    //Check if Form title has been added or removed
    let preview_el = document.querySelector(".preview")

    const obsever = new MutationObserver(function () {
        if (preview_el.contains(document.getElementById("title-mutation"))) {
            $("#form-builder-elements").removeClass("disabledDiv");
            $("#export_html_btn button").removeAttr("disabled", "disabled");
        } else {
            $("#form-builder-elements").addClass("disabledDiv");
            $("#export_html_btn button").attr("disabled", "disabled");
        }
    })

    obsever.observe(preview_el, { childList: true, subtree: true })
});