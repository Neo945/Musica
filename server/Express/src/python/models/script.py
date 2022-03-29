import sys
from predict import predict


def main(his):
    print(predict(his))


main(sys.argv[0])
