/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../../common'
import type {
  History,
  HistoryInterface,
} from '../../../contracts/history/History'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'InvalidClaimIndex',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInputIndices',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnclaimedInputs',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'dapp',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'epochHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint128',
            name: 'firstIndex',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'lastIndex',
            type: 'uint128',
          },
        ],
        indexed: false,
        internalType: 'struct History.Claim',
        name: 'claim',
        type: 'tuple',
      },
    ],
    name: 'NewClaimToHistory',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dapp',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_proofContext',
        type: 'bytes',
      },
    ],
    name: 'getClaim',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_consensus',
        type: 'address',
      },
    ],
    name: 'migrateToConsensus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_claimData',
        type: 'bytes',
      },
    ],
    name: 'submitClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

const _bytecode =
  '0x608060405234801561001057600080fd5b5060405161091e38038061091e83398101604081905261002f91610181565b61003833610057565b6001600160a01b038116331461005157610051816100a7565b506101b1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6100af610125565b6001600160a01b0381166101195760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61012281610057565b50565b6000546001600160a01b0316331461017f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610110565b565b60006020828403121561019357600080fd5b81516001600160a01b03811681146101aa57600080fd5b9392505050565b61075e806101c06000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063715018a6146100675780638da5cb5b14610071578063d79a824014610091578063ddfdfbb0146100bf578063f2fde38b146100d2578063fc411683146100e5575b600080fd5b61006f6100f8565b005b6000546040516001600160a01b0390911681526020015b60405180910390f35b6100a461009f366004610531565b61010c565b60408051938452602084019290925290820152606001610088565b61006f6100cd366004610586565b6101bf565b61006f6100e03660046105c8565b61039a565b61006f6100f33660046105c8565b610418565b610100610429565b61010a6000610483565b565b600080808061011d858701876105ec565b6001600160a01b038816600090815260016020526040902054909150808210610159576040516387332c0160e01b815260040160405180910390fd5b506001600160a01b0396909616600090815260026020908152604080832098835297815290879020875160608101895281548082526001909201546001600160801b03808216948301859052600160801b90910416980188905297909695509350505050565b6101c7610429565b6000806101d683850185610621565b9150915080604001516001600160801b031681602001516001600160801b031611156102155760405163123974fd60e01b815260040160405180910390fd5b6001600160a01b038216600090815260016020526040902054801561028e576001600160a01b0383166000908152600260205260408120906102586001846106d5565b815260200190815260200160002060010160109054906101000a90046001600160801b0316600161028991906106ee565b610291565b60005b6001600160801b031682602001516001600160801b0316146102c65760405163118b891b60e01b815260040160405180910390fd5b6001600160a01b03831660009081526002602090815260408083208484528252918290208451815590840151918401516001600160801b03908116600160801b0292169190911760019182015561031e908290610715565b6001600160a01b03841660008181526001602090815260409182902093909355805185518152858401516001600160801b03908116948201949094528582015190931690830152907fb71880d7a0c514d48c0296b2721b0a4f9641a45117960f2ca86b5b7873c4ab2f9060600160405180910390a25050505050565b6103a2610429565b6001600160a01b03811661040c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61041581610483565b50565b610420610429565b6104158161039a565b6000546001600160a01b0316331461010a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610403565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038116811461041557600080fd5b60008083601f8401126104fa57600080fd5b50813567ffffffffffffffff81111561051257600080fd5b60208301915083602082850101111561052a57600080fd5b9250929050565b60008060006040848603121561054657600080fd5b8335610551816104d3565b9250602084013567ffffffffffffffff81111561056d57600080fd5b610579868287016104e8565b9497909650939450505050565b6000806020838503121561059957600080fd5b823567ffffffffffffffff8111156105b057600080fd5b6105bc858286016104e8565b90969095509350505050565b6000602082840312156105da57600080fd5b81356105e5816104d3565b9392505050565b6000602082840312156105fe57600080fd5b5035919050565b80356001600160801b038116811461061c57600080fd5b919050565b600080828403608081121561063557600080fd5b8335610640816104d3565b92506060601f198201121561065457600080fd5b506040516060810181811067ffffffffffffffff8211171561068657634e487b7160e01b600052604160045260246000fd5b80604052506020840135815261069e60408501610605565b60208201526106af60608501610605565b6040820152809150509250929050565b634e487b7160e01b600052601160045260246000fd5b818103818111156106e8576106e86106bf565b92915050565b6001600160801b0381811683821601908082111561070e5761070e6106bf565b5092915050565b808201808211156106e8576106e86106bf56fea2646970667358221220af04065c5d35d3460abc2711367000a2134970c84818233d66386f35794dfb5b64736f6c63430008130033'

type HistoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: HistoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class History__factory extends ContractFactory {
  constructor(...args: HistoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<History> {
    return super.deploy(_owner, overrides || {}) as Promise<History>
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_owner, overrides || {})
  }
  override attach(address: string): History {
    return super.attach(address) as History
  }
  override connect(signer: Signer): History__factory {
    return super.connect(signer) as History__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): HistoryInterface {
    return new utils.Interface(_abi) as HistoryInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): History {
    return new Contract(address, _abi, signerOrProvider) as History
  }
}
