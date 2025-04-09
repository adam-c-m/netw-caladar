const { useState, useEffect } = React;

// Specific prompts for each date
const promptsByDate = {
  7: "**It's 3 weeks away today!**",
  8: "Networking myths. 'Networking is just for extroverts' or 'Networking is only about selling' – what's a common misconception about networking that you used to believe?",
  9: "Virtual networking = global connections – Have you met someone from another country or industry who gave you valuable insights? Share how virtual networking expands opportunities globally. We've had people attend from many different countries!",
  10: "Why come to our events over a free event \n* Free networking tends to be really full of people, so hard to meet everyone.\n* People who pay for networking are more likely to have established businesses, (aka money to buy, real connections, real opportunities to offer etc) - free networking could attract very early business owners / skint ones so depends on your target audience\n* We provide 18 tips for networking success to everyone that signs up.",
  11: "Look through / use the testimonials in the affiliate doc to generate your own ideas based on what participants thought. You can use the images too!",
  14: "**It's 2 weeks away today!**",
  15: "What can you realistically get for £15? Talk about how little that can buy these days (with examples perhaps?) How spending £15 on this event could turn into lots of opportunities.",
  16: "How do you balance networking with your other commitments? (you can mention that our sessions are always under an hour, plus no travel time!)",
  17: "How has networking benefited you personally or professionally? For me, it's resulted in new clients, speaking opportunities and more!",
  18: "What makes our networking events (or KOGs) unique - in your eyes?",
  19: "Use a meme or gif generator to create a silly meme or gif about virtual networking. Use Google to help!",
  20: "Lots of people say in the survey that the way our events are structured enables them to speak to other business owners about things they hadn't considered, sparking lots of ideas for their own business. Have you experienced this? What kinds of things have you taken away from discussions in our sessions?",
  21: "**It's 1 week away today!**",
  22: "Introvert-friendly networking. Talk about how if big networking events feel overwhelming, ours are designed to be small (never more than 30 people), no pitching, and fun conversations.",
  23: "Look into statistics or quotes about how important networking is - and its effectiveness as part of business and personal growth. Share these. (Check your sources of course!)",
  24: "The benefits of networking outside your profession/industry (i.e how has knowing people in other industries helped you?)",
  25: "What's one thing you wish more people knew about the benefits of networking? (or our networking events in particular)",
  26: "If someone is petrified of networking events what would you say to them about these events?",
  27: "Talk about why the time is now. Why should people not put off attending until the next time.",
  28: "**LAST DAY **Last minute openings in the diary and why not use that time to meet other business owners / make potential opportunities" };


function Calendar() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem("completedPrompts");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("localStorage error:", e);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("completedPrompts", JSON.stringify(completed));
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }, [completed]);

  const toggleComplete = day => {
    setCompleted(prev => ({ ...prev, [day]: !prev[day] }));
  };

  // Create array of days in April 2025
  const daysInApril = 30;
  const firstDayOfMonth = 2; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // April 1, 2025 is a Tuesday (2)

  // Format prompt text with line breaks
  const formatPromptText = text => {
    if (!text) return "";
    // Convert markdown-style line breaks and lists to HTML
    return text.split('\n').map((line, i) => {
      // Handle bullet points
      if (line.startsWith('*')) {
        return /*#__PURE__*/React.createElement("li", { key: i }, line.substring(1).trim());
      }
      // Handle bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before the bold part
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add the bold part
        parts.push( /*#__PURE__*/React.createElement("strong", { key: `bold-${match.index}` }, match[1]));
        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return /*#__PURE__*/React.createElement("p", { key: i }, parts.length > 0 ? parts : line);
    });
  };

  return /*#__PURE__*/(
    React.createElement("div", { style: { padding: "24px", maxWidth: "1600px", margin: "0 auto" } }, /*#__PURE__*/
    React.createElement("h1", { style: { fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "16px" } }, "April 2025 Networking Prompts Calendar"), /*#__PURE__*/



    React.createElement("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "12px",
        backgroundColor: "#f3f4f6",
        padding: "66px",
        borderRadius: "8px" } },


    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => /*#__PURE__*/
    React.createElement("div", { key: `header-${i}`, style: {
        border: "1px solid #e5e7eb",
        padding: "8px",
        borderRadius: "6px",
        backgroundColor: "#e5e7eb",
        textAlign: "center",
        fontWeight: "bold" } },

    day)),




    [...Array(firstDayOfMonth)].map((_, i) => /*#__PURE__*/
    React.createElement("div", { key: `empty-start-${i}`, style: {
        border: "1px solid #e5e7eb",
        padding: "8px",
        borderRadius: "6px",
        backgroundColor: "#f9fafb" } })),




    [...Array(daysInApril)].map((_, i) => {
      const day = i + 1;
      const hasPrompt = promptsByDate[day] !== undefined;

      return /*#__PURE__*/(
        React.createElement("div", {
          key: `day-${day}`,
          style: {
            border: "1px solid #e5e7eb",
            padding: "12px",
            borderRadius: "6px",
            boxShadow: hasPrompt ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            backgroundColor: completed[day] ? "#86efac" : hasPrompt ? "#ffffff" : "#f9fafb",
            cursor: hasPrompt ? "pointer" : "default",
            minHeight: "80px",
            display: "flex",
            flexDirection: "column" },

          onClick: () => hasPrompt && toggleComplete(day) }, /*#__PURE__*/

        React.createElement("p", { style: {
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "6px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "4px" } }, "April ",

        day),


        hasPrompt && /*#__PURE__*/
        React.createElement("div", { style: {
            fontSize: "12px",
            lineHeight: "1.4",
            overflowWrap: "break-word",
            flex: "1" } },

        formatPromptText(promptsByDate[day]))));




    }))));



}

// Render directly to the DOM
ReactDOM.render( /*#__PURE__*/React.createElement(Calendar, null), document.getElementById("app"));