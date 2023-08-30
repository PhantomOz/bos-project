const contract =
  "ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801";

//Getting the messages from the contract
const messages = Near.view(contract, "get_messages", { limit: 20 });

//initializing state
State.init({ message: "" });

//functionality for sending messages
const sendMessage = () => {
  if (state.message.length != 0) {
    Near.call(contract, "send", {
      text: state.message,
    });
  }
};

//getting logged in user
const accountId = context.accountId;

//Using Styled Controls
const SendControls = styled.div`
  display: flex;
  gap: 1em;
  margin: 0.5em;
  position: sticky;
  bottom: 10px;
`;
const container = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 20,
  backgroundColor: "#010322",
  padding: "0.5em 4vw",
};
const Header = styled.div`
  width: 100%;
  padding: 50px 0;
  font-weight: 600;
  font-size: 30px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
`;

const Wrapper = styled.div`
  background-color: #010322;
`;

return (
  <Wrapper>
    <Header>
      <p>🥷🏻 Near BootCamp 23 DAO ⛓️ 🕵️‍♂️</p>
      <button>Chat</button>
      <button>Proposals</button>
    </Header>
    <div style={container}>
      {messages.reverse().map((message) => (
        <div
          style={{
            alignSelf: `${accountId === message.author && "flex-end"}`,
            maxWidth: "250px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          {/* Profile Picture */}
          {accountId !== message.author && (
            <div style={{ width: "40px" }}>
              <Widget
                src="calebjacob.near/widget/AccountProfile"
                props={{
                  accountId: message.author,
                }}
              />
            </div>
          )}
          <div style={{ position: "relative" }}>
            <p
              style={{
                backgroundColor: `${
                  accountId === message.author ? "#7933FF" : "#FFFFFF"
                }`,
                borderRadius: "12px",
                padding: "10px",
                color: `${
                  accountId === message.author ? "#FFFFFF" : "#000000"
                }`,
              }}
            >
              {message.text}
            </p>
            <div
              style={{
                fontSize: "12px",
                color: "#FFFFFF",
                position: "absolute",
                bottom: "-5px",
                left: `${message.author !== accountId ? 0 : "90%"}`,
              }}
            >
              <Widget
                src="andyh.near/widget/TimeAgo"
                props={{
                  blockHeight: message.block_height,
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <SendControls>
        <button>📃</button>
        <input
          type="text"
          onInput={(e) => State.update({ message: e.target.value })}
          value={state.message}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </SendControls>
    </div>
  </Wrapper>
);
