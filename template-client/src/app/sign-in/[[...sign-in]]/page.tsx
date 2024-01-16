import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (<div className={'container m-auto flex justify-center mt-6'} ><SignIn /></div>);
}