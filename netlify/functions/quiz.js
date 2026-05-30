exports.handler = async (event) => {
  try {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: true,
        message: "Quiz API working 🎉",
        data: {
          title: "Ethio Quiz Focus",
          status: "ready"
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Server error"
      })
    };
  }
};
