import React from 'react';

import { useWallet } from '../../context/wallet';
import { SupportedNetworks } from '../../utils/constants';
import { PrimaryButton, SecondaryButton } from '../Buttons';

const Circle = ({ connected, networkId }: { connected: boolean; networkId: SupportedNetworks }) => {
  const color = connected ? (networkId === SupportedNetworks.MAINNET ? '#05b169' : '#8F7FFE') : '#DF5F67';
  return (
    <div
      style={{
        marginRight: '1rem',
        display: 'inline-block',
        backgroundColor: color,
        borderRadius: '50%',
        width: '.75rem',
        height: '.75rem',
      }}
    />
  );
};

const formatAddress = (address: string) => {
  return address.slice(0, 8) + '…' + address.slice(address.length - 8, address.length);
};

type SelectorProps = {
  buttonClicked?: () => void;
};

const WalletSelector = ({ buttonClicked }: SelectorProps) => {
  const { handleSelectWallet, connected, address, networkId } = useWallet();

  const handleClick = () => {
    buttonClicked?.();
    handleSelectWallet();
  };

  return (
    <>
      {connected ? (
        <SecondaryButton onClick={handleClick} variant={'contained'} disableElevation>
          <Circle connected={connected} networkId={networkId} />
          {formatAddress(address)}
        </SecondaryButton>
      ) : (
        <PrimaryButton onClick={handleClick} variant={'contained'} disableElevation>
          Connect Wallet
        </PrimaryButton>
      )}
    </>
  );
};

export default WalletSelector;
