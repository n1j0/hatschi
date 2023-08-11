import { Crypto } from '@peculiar/webcrypto'
import { TextEncoder as TextEncoder0 } from 'util'

global.crypto = new Crypto()
global.TextEncoder = TextEncoder0
