import NotFoundRedirect from "@/src/components/web/not-found-redirect"

function NotFound() {
  return (
    <>
      <div className="relative">
        <NotFoundRedirect />
        <div className="h-screen max-h-screen grid place-content-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10rem] font-bold text-primary">404</span>
            <span className="text-4xl -translate-y-6">ops! Not found this page</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound