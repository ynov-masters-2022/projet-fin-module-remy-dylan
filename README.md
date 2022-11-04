# Présentation du projet KeepNote

## Sommaire
1. Présentation de framer motion
2. Présentation de TypeScript
3. Présentation de l'API Context
4. Présentation API context + TypeScript

## 1. Présentation de framer motion

## 2. Présentation de TypeScript
![Logo TS](https://www.tutorialsteacher.com/Content/images/home/typescript.svg)
TypeScript est un langage de programmation visant a étendre le langage JavaScript. TypeScript comme son nom l'indique apporte un coté rassurant et utile qui manque a JS, le typage. Il permet par exemple de détecter des erreur de types a la compilation et non a l'éxécution du programme.
## 3. Présentation de l'API Context
L'API Context de React permet de gérer des states globales et d'éxécuter différentes action sur ces states. Plus léger et plus rapide a mettre en oeuvre qu'une structure redux.

## 4. Présentation API context + TypeScript
Sur ce projet nous avons pu mettre en place l'API context mais avec la particularité que chaque action que l'on vas dispatch sont fortement typés. A la compilation TS est capable de nous dire si ou non les bons paramètres sont passés a notre action.

Pour illustrer nous allons montrer un bout de code qui nous permet de typés nos actions.
```Typescript
//Ici on définis un type qui prend un autre type M.
//M dans ce cas est un type générique.
//Et ce type doit obligatoirement avoir la forme clé est une chaine et la valeur peu importe
//Ensuite on dit que pour chaque clé que l'on va trouver dans notre Objet M, on va map
//la clé puis on va lui définir une valeur en fonction de sa propre valeur
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};    
```