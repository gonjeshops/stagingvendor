import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp }) {
const {
    seconds,
    minutes,
    restart,
    isRunning,
 
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

return (
    <>
     <span>{minutes}</span>:<span>{seconds}</span>
     <p>{isRunning ? 'Otp will expire after 10 minutes!' : 'Otp expired!'}</p>
     

     </>
    );
}
