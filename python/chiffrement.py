import random
import string

def generate_password():
    chars = string.ascii_letters + string.digits + string.punctuation
    print("len:"+str(len(chars))+"\n")
    mdp=''
    mdpv2=''
    for i in range(16) :
        mdp+=chars[random.randrange(94)]
        mdpv2+=random.choice(chars)

    print(mdp+"\n")
    print(mdpv2+"\n")
    return mdp

generate_password()