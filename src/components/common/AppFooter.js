import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&reg; 2022 Kadali's Store.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        &copy; Admin panel
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
