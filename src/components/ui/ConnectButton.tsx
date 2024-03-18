import { useEffect } from 'react'
// import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import configFile from '@/config/cartesi.json'
import { useConnectContext } from '@/components/providers/ConnectProvider'
import Button from '../shared/Button'

const config: any = configFile

const ConnectButton = () => {
  const {
    updateBaseDappAddress,
    updateCurrentUser,
    wallet,
    connecting,
    connect,
    disconnect,
    notices,
  } = useConnectContext()

  // const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value
  //   if (config[value] !== undefined) {
  //     setChain({ chainId: value })
  //   } else {
  //     alert('No deploy on this chain')
  //   }
  // }

  useEffect(() => {
    // dont really understand what this is for
    if (notices) {
      updateBaseDappAddress(wallet?.accounts[0]?.address)
      notices?.length > 0 &&
        updateCurrentUser(
          JSON.parse(notices?.reverse()[0].payload).users.filter(
            (it: any) => it.address === wallet?.accounts[0]?.address
          )
        )
    }
  }, [wallet])

  return (
    <div>
      {!wallet && (
        <Button onClick={() => connect()} className="w-[200px]">
          {connecting ? 'Connecting ...' : 'Connect'}
        </Button>
      )}

      {wallet && (
        <div className="space-x-3">
          {/* {settingChain ? (
          <span>Switching chain...</span>
        ) : (
          <select onChange={handleChainChange} value={connectedChain?.id} >
            {chains.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        )} */}
          <Button onClick={() => disconnect(wallet)} className="w-[200px]">
            Disconnect Wallet
          </Button>
        </div>
      )}
    </div>
  )
}

export default ConnectButton
