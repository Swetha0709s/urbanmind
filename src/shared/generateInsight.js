export const generateInsight = (data) => {
  if (!data) return "Initializing neural networks for city analysis...";

  const { traffic, weather, airQualityIndex: aqi, temperature } = data;
  let insights = [];

  if (traffic > 85) insights.push("Severe gridlock detected; autonomous rerouting suggests avoiding the central corridor.");
  else if (traffic > 70) insights.push("Heavy congestion detected on main transit arteries.");

  if (weather === "Rain") {
    if (aqi > 100) {
      insights.push("Rainfall is currently mitigating elevated pollution levels, but visibility remains low.");
    } else {
      insights.push("Active rainfall may cause significant logistical delays.");
    }
  }

  if (aqi > 150) insights.push("Air quality is at dangerous levels. Urban scrubbers at 100% capacity.");
  else if (aqi > 100 && traffic > 70) insights.push("Severe pollution spikes detected due to idling traffic congestion.");
  else if (aqi > 100) insights.push("High pollution detected; atmospheric filters active.");

  if (temperature > 35) insights.push("Heatwave protocol active: Energy grid diverting power to cooling nodes.");

  // Incident specific (if the alert field contains "accident")
  if (data.alert?.toLowerCase().includes("accident")) {
    insights.push("Major incident reported: Emergency response teams dispatched.");
  }

  return insights.length > 0 
    ? insights.join(" ") 
    : "Metropolis metrics are currently within optimal parameters. All sectors signal green.";
};
