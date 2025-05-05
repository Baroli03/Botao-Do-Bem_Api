
CREATE DATABASE EmocoesDB;
USE EmocoesDB;


CREATE TABLE Tristeza (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Frase TEXT NOT NULL
);

CREATE TABLE Alegria (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Frase TEXT NOT NULL
);

CREATE TABLE Raiva (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Frase TEXT NOT NULL
);

INSERT INTO Tristeza (Frase) VALUES
("Mesmo os dias nublados têm seu fim — o sol sempre volta a brilhar."),
("A dor pode ser inevitável, mas o sofrimento é opcional."),
("Cada lágrima carrega a semente de um novo começo.");


INSERT INTO Alegria (Frase) VALUES
("Sorrir é o idioma universal da esperança."),
("Celebre as pequenas conquistas, elas constroem grandes vitórias."),
("A alegria não está nas coisas, está em nós.");


INSERT INTO Raiva (Frase) VALUES
("Respire fundo, a paz começa com uma escolha."),
("A raiva é uma tempestade passageira — não tome decisões sob sua chuva."),
("Canalize sua energia para construir, não destruir.");
