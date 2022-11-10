
# Présentation du projet KeepNote

## Sommaire
1. Qu'est ce que KeepNote ?
2. Présentation de framer motion
3. Présentation de TypeScript
4. Présentation de l'API Context
5. Présentation API context + TypeScript

## 1. Qu'est ce que KeepNote ? 
KeepNote est un petit projet étudiant réalisé par Dylan Antoniotti et Rémy Potus dans le cadre de notre mastère expert en développement web à Yov. Nous avons fait ce projet dans le cours de React, un framework Javascript.
Le but du projet est de pouvoir créer et maintenir des notes, avec des intéractions ludiques de drag & drop et autres animations.

## 2. Présentation de framer motion
Framer motion est une librairie Javascript conçue pour gérer des animations. Elle a une syntaxe très simple, ce qui la rend facile à implémenter dans tout type de projet.
site officiel : https://www.framer.com/motion/
github : https://github.com/framer/motion

Afin de pouvoir manipuler les éléments de l'écran, nous avons utiliser le composant "motion".

``` typescript
import { motion} from "framer-motion";
```

Le composant motion permet d'animer des éléments HTML en 60 fps.
On peut insérer tout type d'animation, de complixité faible à difficile, sur un élément.
Afin de rendre un composant "dragable", nous nous sommes servis des propriétés 'drag', 'dragConstraints', 'onDrag' et 'onDragEnd'.
```Typescript import
const DraggableCard = ({ parentContainer, onClick, onDrag, onDragEnd, children}: IDraggableCardProps) => {
    return (
        <motion.div
            drag
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            dragConstraints={parentContainer}
            onClick={onClick}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
        >
            {children}
        </motion.div>
    )
}
```
Pour pouvoir se servir d'un drag and drop, délimiter une zone très claire. Ainsi, nous avons passé la référence du composant parent à chaque appel d'une draggable card, dans les drags constraints, pour que la draggable card ne sorte pas de l'écran.

```Typescript 
    const refContainer = useRef<HTMLDivElement>(null);
    <div style={containerStyle} ref={refContainer}>
        <KeepCard 
            parentContainer={refContainer} 
            keepNote={card}
            isInTrashFn={isInTrash}
            key={card.id}
        />
    </div>

```


Framer motion permet également de gérer des petites animations comme sur le 'hover' ou le 'tap', avec les propriétés whileHover ou whileTap.
On peut également faire des animations simple comme de la disparition d'éléments avec la gestion de taille et d'opacité comme c'est le cas lorsqu'on clique sur un carte pour faire un "focus" dessus.

```Typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1, transition: {delay:0.5}}}
exit={{ opacity: 0,height:'0px'}}
```
Mais on peut aussi gérer des déplacement avec les translations etc ...

La base de cette librairie est donc le composant 'motion'. Cependant nous nous sommes servis d'un autre composant : AnimatePresence.

```Typescript 
import { motion, AnimatePresence} from "framer-motion";
```
Le composant AnimatePresence permet d'animer les composants lorsqu'ils sont supprimé du "React tree", à savoir, les éléments que react reconnait et utilise.
Ce composant permet d'utiliser les animations 'exit' qui serait inutilisable autrement, car React ne préviens pas quand les composants vont être détruit.

```Typescript 
<AnimatePresence> 
    {
        !isBig && (
                <motion.div
                key={noteTitle + 'small'}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0, maxHeight:'0px'}}
                transition={{ duration: 0.5}}
                >
                <div ref={cardRef} style={{...style,...smallStyle}} onClick={togglePosition}>
                    <p>{noteTitle}</p>
                    <p>{noteContent}</p>
                </div>
                </motion.div>
        )
    }
```
Ici par exemple, lorsque la variable isBig passe de true à false, le composant motion.div n'existe plus, mais grâce au composant parent AnimatePresence, il va tout de même pouvoir faire son animation exit.

## 3. Présentation de TypeScript
![Logo TS](https://www.tutorialsteacher.com/Content/images/home/typescript.svg)
TypeScript est un langage de programmation visant a étendre le langage JavaScript. TypeScript comme son nom l'indique apporte un coté rassurant et utile qui manque a JS, le typage. Il permet par exemple de détecter des erreur de types a la compilation et non a l'éxécution du programme.
## 4. Présentation de l'API Context
L'API Context de React permet de gérer des states globales et d'éxécuter différentes action sur ces states. Plus léger et plus rapide a mettre en oeuvre qu'une structure redux.

## 5. Présentation API context + TypeScript
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