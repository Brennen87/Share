import * as React from 'react';
import PaymentsCard from '../../../components/UI/PaymentsCard';
import { paymentLevels } from '../../../common/constants';

function PaymentLevels({ earnings = 0 }) {
  const [currentLevelIndex, setCurrentLevelIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentLevelIndex(
      paymentLevels.findIndex(
        level =>
          (!level.totalEarningsMax && earnings > level.totalEarningsMin) ||
          (earnings >= level.totalEarningsMin && earnings <= level.totalEarningsMax)
      ) || 0
    );
  }, [earnings]);

  return (
    <>
      <div className="paymentsinfo__container_own">
        {currentLevelIndex > -1 ? (
          <PaymentsCard
            number={currentLevelIndex + 1}
            level={paymentLevels[currentLevelIndex].level}
            fee={paymentLevels[currentLevelIndex].fee}
            totalEarningsMin={paymentLevels[currentLevelIndex].totalEarningsMin}
            totalEarningsMax={paymentLevels[currentLevelIndex].totalEarningsMax}
            ownLevel
          />
        ) : null}
      </div>

      <div className="paymentsinfo__container_general">
        {paymentLevels.map((item, index) => (
          <PaymentsCard
            key={index}
            number={index + 1}
            level={item.level}
            fee={item.fee}
            totalEarningsMin={item.totalEarningsMin}
            totalEarningsMax={item.totalEarningsMax}
          />
        ))}
      </div>
    </>
  );
}

{/* <>
      <div className="paymentsinfo__container_own">
        {currentLevelIndex > -1 ? (
          <PaymentsCard
            number={currentLevelIndex + 1}
            level={paymentLevels[currentLevelIndex].level}
            fee={paymentLevels[currentLevelIndex].fee}
            totalEarningsMin={paymentLevels[currentLevelIndex].totalEarningsMin}
            totalEarningsMax={paymentLevels[currentLevelIndex].totalEarningsMax}
            ownLevel
          />
        ) : null}
      </div>

      <div className="paymentsinfo__container_general">
        {paymentLevels.map((item, index) => (
          <PaymentsCard
            key={index}
            number={index + 1}
            level={item.level}
            fee={item.fee}
            totalEarningsMin={item.totalEarningsMin}
            totalEarningsMax={item.totalEarningsMax}
          />
        ))}
      </div>
    </> */}

{/* <>
      {currentLevelIndex > -1 ? (
        <PaymentsCard
          number={currentLevelIndex + 1}
          level={paymentLevels[currentLevelIndex].level}
          fee={paymentLevels[currentLevelIndex].fee}
          totalEarningsMin={paymentLevels[currentLevelIndex].totalEarningsMin}
          totalEarningsMax={paymentLevels[currentLevelIndex].totalEarningsMax}
          ownLevel
        />
      ) : null}
      {paymentLevels.map((item, index) => (
        <PaymentsCard
          key={index}
          number={index + 1}
          level={item.level}
          fee={item.fee}
          totalEarningsMin={item.totalEarningsMin}
          totalEarningsMax={item.totalEarningsMax}
        />
      ))}
    </> */}

export default PaymentLevels;
