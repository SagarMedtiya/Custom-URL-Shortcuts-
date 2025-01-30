document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("analytics-chart").getContext("2d");
  
    // Fetch shortcut usage data
    chrome.storage.sync.get("shortcuts", (data) => {
      const shortcuts = data.shortcuts || {};
      const labels = [];
      const usageData = [];
  
      // Prepare data for the chart
      for (const category in shortcuts) {
        for (const key in shortcuts[category]) {
          labels.push(key);
          usageData.push(shortcuts[category][key].usage || 0);
        }
      }
  
      // Render the chart
      new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Shortcut Usage",
            data: usageData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  });