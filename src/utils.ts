import { BN } from "@coral-xyz/anchor"

export function getRandomMetadataKeyId(): BN {
  return new BN(Math.floor(Math.random() * 100000000))
}

export function splitKey(key: string) {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};