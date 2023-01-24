import random
import string

def generate_password(letter,digits,punctuation):
    if(letter and not digits and not punctuation) :
        chars = string.ascii_letters

    elif(letter and digits and not punctuation) :
        chars = string.ascii_letters + string.digits
        

    elif(letter and not digits and punctuation) :
        chars = string.ascii_letters + string.punctuation

    elif(letter and digits and punctuation) :
        chars = string.ascii_letters + string.digits + string.punctuation        

    elif(not letter and digits and not punctuation) :
        chars = string.digits

    elif(not letter and digits and punctuation) :
        chars = string.digits + string.punctuation

    elif(not letter and not digits and punctuation) :
        chars = string.punctuation

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