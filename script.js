document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("zone-select").addEventListener("change", function() {
        let zone = this.value;
        fetch(`/get_rides/${zone}`)
            .then(response => response.json())
            .then(data => {
                let rideList = document.getElementById("ride-list");
                rideList.innerHTML = "";
                if (data.length === 0) {
                    rideList.innerHTML = "<p>No rides available in this zone.</p>";
                } else {
                    data.forEach(ride => {
                        let item = document.createElement("p");
                        item.textContent = `${ride.ride_name}: ${ride.pickup_location} → ${ride.dropoff_location}`;
                        rideList.appendChild(item);
                    });
                }
            });
    });
});

function saveZone() {
    let zone = document.getElementById("zone-select").value;
    fetch("/save_zone", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `zone=${zone}`
    })
    .then(response => response.json())
    .then(data => {
        alert(`Zone ${data.zone} saved successfully!`);
    });
}
