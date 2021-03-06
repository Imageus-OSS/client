import { Alert } from 'antd';
import '../../scss/landing.scss';

type LandingCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  error?: string; 
};

function LandingCard({
  title, children, className, error,
}: LandingCardProps): JSX.Element {
  return (
    <div className={`landing-card ${className}`}>
      {
        error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            closable
          />
        )
      }
      <h1 style={{ width: '100%' }}>{title}</h1>
      <div className="landing-card-content-container">
        {children}
      </div>
    </div>
  );
}

export default LandingCard;
