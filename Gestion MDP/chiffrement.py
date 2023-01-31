import random
import string
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes


def generate_password(letter,digits,punctuation):
    chars=''
    if(letter) :
        chars += string.ascii_letters

    if(digits ) :
        chars += string.digits
        
    if(punctuation) :
        chars += string.punctuation

    print("len:"+str(len(chars))+"\n")
    mdp=''
    mdpv2=''
    for i in range(16) :
        mdp+=chars[random.randrange(len(chars))]
        mdpv2+=random.choice(chars)
    return mdp

#Que du CC, faut comprendre là et adapter

key = get_random_bytes(16)

def encrypt(mdp):
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(mdp.encode())
    nonce = cipher.nonce

    return nonce, ciphertext, tag

def decrypt(nonce, ciphertext, tag):    
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    plaintext = cipher.decrypt(ciphertext)
    
    try:
        cipher.verify(tag)
        return plaintext.decode()
    except:
        return False

mdp=generate_password(1,1,1)
nonce, ciphertext, tag = encrypt(mdp)
plaintext = decrypt(nonce, ciphertext, tag)
print(f'Cipher text: {ciphertext}')
if not plaintext :
    print('Message is corrupted')
else :
    print("Plain Text: "+plaintext)