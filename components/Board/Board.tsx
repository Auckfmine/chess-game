import {GetStaticProps} from 'next';

const Board = () => {
    return (
        <div>
            Enter
        </div>
    );
}

export const getStaticProps:GetStaticProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}

export default Board;