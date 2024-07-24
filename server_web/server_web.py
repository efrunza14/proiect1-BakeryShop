import socket
import os
import gzip
import threading


# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada

def client_threading(clientsocket):
    # se proceseaza cererea si se citeste prima linie de text
        cerere = ''
        linieDeStart = ''
        while True:
            data = clientsocket.recv(1024)
            if len(data) < 1:
                break
            cerere = cerere + data.decode()
            print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
            pozitie = cerere.find('\r\n')
            if (pozitie > -1):
                linieDeStart = cerere[0:pozitie]
                print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
                break
        print('S-a terminat cititrea.')
        if linieDeStart == '':
            clientsocket.close()
            print ('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')

        vector = linieDeStart.split(' ')
        numeResursa = vector[1]
        if numeResursa == '/':
            numeResursa= '/index.html'

        # deschide fisierul pentru citire
        #numeFisier = '../continut'+ numeResursa
        numeFisier = 'c:/xampp/htdocs/FACULTATE/proiect-1-efrunza14/continut'+ numeResursa
        fisier = None
        try:
            fisier = open(numeFisier, 'rb')
            raspuns = ''
            if numeResursa.endswith('.html'):
                raspuns += 'text/html; charset=utf-8'

            elif numeResursa.endswith('.css'):
                raspuns += 'text/css; charset=utf-'

            elif numeResursa.endswith('.js'):
                raspuns += 'text/javascript; charset=utf-8'

            elif numeResursa.endswith('.png'):
                raspuns += 'image/png'

            elif numeResursa.endswith('.jpg') or numeResursa.endswith('.jpeg'):
                raspuns += 'image/jpeg'

            elif numeResursa.endswith('.gif'):
                raspuns += 'image/gif'

            elif numeResursa.endswith('.ico'):
                raspuns += 'image/x-icon'

            elif numeResursa.endswith('.xml'):
                raspuns += 'application/xml; charset=utf-8'

            elif numeResursa.endswith('.json'):
                raspuns += 'application/json; charset=utf-8'

            content = fisier.read()

            # inainte de a trimite continutulcatre client, fisierul este comprimat
            # pentru a reduce dimensiunea datelor trimise si pentru a reduce timpul de
            # incarcare a paginilor web
            
            content_compressed = gzip.compress(content)
            content_encoding = 'gzip'

            clientsocket.sendall(b'HTTP/1.1 200 OK\r\n')
            clientsocket.sendall(b'Content-Length: ' + str(len(content_compressed)).encode() + b'\r\n')
            clientsocket.sendall(b'Content-Encoding: ' + content_encoding.encode() + b'\r\n')
            clientsocket.sendall(b'Content-Type: ' + raspuns.encode() + b'\r\n')
            clientsocket.sendall(b'Server: My PW Server\r\n')
            clientsocket.sendall(b'\r\n')
            clientsocket.sendall(content_compressed)

            buf = fisier.read(1024)
            while (buf):
                clientsocket.send(buf)
                buf = fisier.read(1024)
        except IOError:
            # daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
            msg = 'Eroare! Resursa ceruta ' + numeResursa + ' nu a putut fi gasita!'
            print (msg)
        finally:
            if fisier is not None:
                fisier.close()
        clientsocket.close()
        print('S-a terminat comunicarea cu clientul.')

def main():
    # creeaza un server socket
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # specifica ca serverul va rula pe portul 5677, accesibil de pe orice ip al serverului
    serversocket.bind(('', 5677))
    serversocket.listen()

    while True:
        print('########### ##############################################################')
        print('Serverul asculta potentiali clienti.')

        # asteapta conectarea unui client la server
        # metoda accept este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
        (clientsocket, address) = serversocket.accept()
        print("S-a conectat un client.")

        # creeaza un thread nou pentru a procesa cererea clientului
        client_thread = threading.Thread(target=client_threading, args=(clientsocket,))
        client_thread.start()

if __name__ == '__main__':
    main()
