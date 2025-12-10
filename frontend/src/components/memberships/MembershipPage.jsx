import MembershipList from "./MembershipList";
import "./memberships.style.css";

const MembershipPage = () => {
  return (
    <main>
      <div className="membership-page-container">
        <MembershipList />
      </div>
    </main>
  );
};

export default MembershipPage;