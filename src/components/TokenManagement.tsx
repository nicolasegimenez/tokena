import TokenInfo from "./TokenInfo";
import TransferManagement from "./TransferManagement";
import CreateToken from "./CreateToken";

function TokenManagement() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TokenInfo />
          <CreateToken />
        </div>
        <div>
          <TransferManagement />
        </div>
      </div>
    </div>
  );
}

export default TokenManagement;
