async function get_all_staff_info() {
    let temp_data = await fetch(`${api_ip}api/person_page/get_all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Data: {}
        }),
    })
    .then((response) => {
        return response.json();
    });

    return temp_data;
}

async function staff_add_edit_api(data) {
    console.log({
        Data : { data },
        Value : data[0].ID
    });
    let temp_data = await fetch(`${api_ip}api/person_page/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                Data :  data,
                Value : data[0].ID
            }
        ),
    })
    .then((response) => {
        return response.json();
    });

    return temp_data;
}