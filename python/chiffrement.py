import random
import string

def generate_password(letter,digits,punctuation):
    chars=''
    if(letter) :
        chars += string.ascii_letters

    if(digits ) :
        chars +=string.digits
        
    if(punctuation) :
        chars += string.punctuation

    print("len:"+str(len(chars))+"\n")
    mdp=''
    mdpv2=''
    for i in range(16) :
        mdp+=chars[random.randrange(len(chars))]
        mdpv2+=random.choice(chars)

    print(mdp+"\n")
    print(mdpv2+"\n")
    return mdp

generate_password(False,False,True)